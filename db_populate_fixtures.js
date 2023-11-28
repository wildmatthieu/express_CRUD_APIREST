import createConnection from './db_connection.js';

const numberOfTransactions = 50;

async function populateFixtures(numberOfTransactions) {
  try {
    const connection = await createConnection();

    for (let i = 1; i <= numberOfTransactions; i++) {
      const transaction = {
        client_sender: Math.floor(Math.random() * 1000) + 1, // un client dont l'id est compris entre 1 et 1000
        client_receiver: Math.floor(Math.random() * 1000) + 1,
        amount: Math.floor(Math.random() * 100000) + 1, // un montant aléatoire entre 1 et 100000
        date: new Date().toISOString().slice(0, 10), // Date actuelle au format YYYY-MM-DD
        comment: 'commentaire factice de la transaction ' + i
      };

      await connection.query('INSERT INTO transaction SET ?', transaction);
    }

    console.log(`Ajout de ${numberOfTransactions} transactions factices avec succès.`);

    // on ferme proprement la connection entre ce fichier et la base de données
    await connection.end();
  } catch (error) {
    console.error('Une erreur s\'est produite :', error.message);
  }
}

populateFixtures(numberOfTransactions);