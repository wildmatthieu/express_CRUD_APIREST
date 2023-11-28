import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Charger les variables d'environnement depuis le fichier .env.local
// et non depuis le .env qui ne doit contenir aucune donnée sensible ! 
// rappel : le fichier .env.local ne doit JAMAIS être versionné par git dans un vrai projet
dotenv.config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Erreur produite lors de la connexion à la base de données:', error.message);
    throw error;
  }
}

export default createConnection;
