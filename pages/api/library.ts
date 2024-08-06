import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
      const items = await db.all(`
        SELECT title, img, link FROM library
        WHERE user_id = ?
      `, [userId]);

      res.status(200).json(items);
    } catch (error) {
      console.error('Failed to fetch library:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

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
