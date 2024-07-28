import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/lib/db';
import crypto from 'crypto';
import { serialize } from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Gerar um hash simples da senha
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      // Verificar o usuário no banco de dados
      const users = await db.all('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword]);
      const user = users[0];

      if (user) {
        // Configurar o cookie da sessão
        res.setHeader('Set-Cookie', serialize('session', JSON.stringify({ username: user.username }), {
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7, // 1 semana
        }));

        return res.status(200).json({ message: 'Login successful', user: { username: user.username } });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
