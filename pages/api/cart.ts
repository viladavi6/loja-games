'use client';

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ error: 'Unauthorized: No session cookie' });
  }

  const userId = await getUserIdFromSession(sessionCookie);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Invalid session' });
  }

  if (req.method === 'GET') {
    try {
      const cartItems = await db.all(`
        SELECT title, img, link, price
        FROM cart
        WHERE user_id = ?
      `, [userId]);

      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, img, link, price } = req.body;

      if (!title || !img || !link || typeof price !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      await db.run(`
        INSERT INTO cart (user_id, title, img, link, price)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT (user_id, title) DO NOTHING
      `, [userId, title, img, link, price]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      await db.run(`
        DELETE FROM cart
        WHERE user_id = ? AND title = ?
      `, [userId, title]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST' && req.url?.includes('/checkout')) {
    try {
      const { cartItems } = req.body;

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: 'Invalid cartItems array' });
      }

      // Iniciar uma transação
      await db.run('BEGIN TRANSACTION');

      // Calcular o custo total dos itens no carrinho
      const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

      // Obter o saldo atual do usuário
      const userBalance = await db.get(`
        SELECT balance FROM users
        WHERE id = ?
      `, [userId]);

      if (!userBalance) {
        await db.run('ROLLBACK');
        return res.status(404).json({ error: 'User not found' });
      }

      if (userBalance.balance < totalCost) {
        await db.run('ROLLBACK');
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Adicionar itens à biblioteca do usuário e remover do carrinho
      for (const item of cartItems) {
        await db.run(`
          INSERT INTO library (user_id, title, img, link, price)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT (user_id, title) DO NOTHING
        `, [userId, item.title, item.img, item.link, item.price]);

        await db.run(`
          DELETE FROM cart
          WHERE user_id = ? AND title = ?
        `, [userId, item.title]);
      }

      // Atualizar saldo do usuário
      await db.run(`
        UPDATE users
        SET balance = balance - ?
        WHERE id = ?
      `, [totalCost, userId]);

      // Confirmar a transação
      await db.run('COMMIT');

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to process checkout:', error);
      await db.run('ROLLBACK');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// Função fictícia para obter o user_id a partir do cookie de sessão
async function getUserIdFromSession(sessionCookie: string): Promise<number | null> {
  console.log('Retrieving user ID for session:', sessionCookie);
  return 1; // Substitua pelo valor real obtido com base no cookie de sessão
}
