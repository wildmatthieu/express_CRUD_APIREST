const createConnection = require("./db_connection.js");

async function resetDatabase() {
  try {
    const connection = await createConnection();

    // Suppression de la table 'transaction' (si elle existe)
    await connection.query('DROP TABLE IF EXISTS transaction');

    // On recrée la table 'transaction'
    await connection.query(`
      CREATE TABLE transaction (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_sender INT NOT NULL,
        client_receiver INT NOT NULL,
        amount INT NOT NULL,
        date DATE NOT NULL,
        comment VARCHAR(255),
        CONSTRAINT chk_comment CHECK (comment IS NULL OR LENGTH(comment) <= 255)
      )
    `);

    // On ferme proprement la connexion ce fichier et la base de données
    await connection.end();

  } catch (error) {
    console.error('Une erreur s\'est produite :', error.message);
  }
}

resetDatabase();