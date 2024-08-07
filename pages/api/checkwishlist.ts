// pages/api/checkwishlist.ts
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
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const gameInWishlist = await db.get('SELECT 1 FROM wishlist WHERE user_id = ? AND title = ?', [userId, title]);
      const exists = !!gameInWishlist;

      res.status(200).json({ exists });
    } catch (error) {
      console.error('Failed to check game in wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
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
