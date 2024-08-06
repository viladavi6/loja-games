import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/lib/db';

const redeemCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ error: 'Unauthorized: No session cookie' });
  }

  const userId = await getUserIdFromSession(sessionCookie);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Invalid session' });
  }

  if (req.method === 'POST') {
    try {
      const { code } = req.body;

      // Verificar se o código é válido e obter o valor associado
      const giftCard = await db.get('SELECT * FROM gift_cards WHERE code = ?', code);

      if (giftCard) {
        // Atualizar o saldo do usuário
        const amount = giftCard.amount;

        await db.run('UPDATE users SET balance = balance + ? WHERE id = ?', amount, userId);
        await db.run('DELETE FROM gift_cards WHERE code = ?', code); // Opcional: Remover o código usado

        res.status(200).json({ amount });
      } else {
        res.status(400).json({ error: 'Código inválido.' });
      }
    } catch (error) {
      console.error('Error redeeming code:', error);
      res.status(500).json({ error: 'Erro ao resgatar o código.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default redeemCode;

async function getUserIdFromSession(sessionCookie: string): Promise<number | null> {
  try {
    const session = JSON.parse(sessionCookie);
    const user = await db.get('SELECT id FROM users WHERE username = ?', session.username);
    return user ? user.id : null;
  } catch (error) {
    console.error('Error retrieving user ID from session:', error);
    return null;
  }
}
