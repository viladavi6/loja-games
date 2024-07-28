import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Abrindo a conexão com o banco de dados
async function openDb(): Promise<Database> {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

// Função para inicializar o banco de dados
async function initializeDatabase(): Promise<void> {
  const db = await openDb();

  // Criar a tabela users se não existir
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      birthdate DATE NOT NULL
    );
  `);
}

// Garantir que o banco de dados esteja inicializado
initializeDatabase().catch(error => {
  console.error('Failed to initialize the database:', error);
});

// Tipos para o módulo de banco de dados
interface DatabaseModule {
  run(query: string, ...params: any[]): Promise<void>;
  all(query: string, ...params: any[]): Promise<any[]>;
}

// Exportando o módulo de banco de dados
const db: DatabaseModule = {
  async run(query: string, ...params: any[]): Promise<void> {
    const db = await openDb();
    await db.run(query, ...params);
  },
  async all(query: string, ...params: any[]): Promise<any[]> {
    const db = await openDb();
    return db.all(query, ...params);
  },
};

export default db;
