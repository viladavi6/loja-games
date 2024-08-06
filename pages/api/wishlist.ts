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

  if (req.method === 'POST') {
    try {
      const { title, img, link } = req.body;

      await db.run(`
        INSERT INTO wishlist (user_id, title, img, link)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (user_id, title) DO NOTHING
      `, [userId, title, img, link]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { title } = req.body;

      await db.run(`
        DELETE FROM wishlist
        WHERE user_id = ? AND title = ?
      `, [userId, title]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const items = await db.all(`
        SELECT title, img, link FROM wishlist
        WHERE user_id = ?
      `, [userId]);

      res.status(200).json(items);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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
