import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/lib/db';
import crypto from 'crypto';

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
  cpf: string;
  birthdate: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body: RegisterRequestBody = req.body;

    const { username, email, password, cpf, birthdate } = body;

    if (!username || !email || !password || !cpf || !birthdate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Gerar um hash simples da senha
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      // Inserir o usuário no banco de dados
      await db.run('INSERT INTO users (username, email, password, cpf, birthdate) VALUES (?, ?, ?, ?, ?)', username, email, hashedPassword, cpf, birthdate);

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'User registration failed' });
    }
  } else {
    // Método HTTP não suportado
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
