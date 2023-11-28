import express from "express";
import createConnection from "./db_connection.js";

const server = express();
const port = 3000;

server.use(express.json()); // NE PAS OUBLIER !!!

// (Crud : CREATE) Création d'une nouvelle transaction bancaire
server.post('/transactions', async (req, res) => {
  const connection = await createConnection();
  const transaction = req.body;

  await connection.query('INSERT INTO transaction(client_sender, client_receiver, amount, date) VALUES(?, ?, ?, ?)', [transaction.client_sender, transaction.client_receiver, transaction.amount, transaction.date]);

  res.sendStatus(200);
});

// (cRud : READ) Lecture de toutes les transactions bancaires
server.get('/transactions', async (req, res) => {
  const connection = await createConnection();

  const results = await connection.query('SELECT * from transaction');
  res.json(results[0]);
});

// (cRud : READ) Lecture d'une transactions bancaires
server.get('/transactions/:id', async (req, res) => {
  const connection = await createConnection();

  const results = await connection.query('SELECT * from transaction WHERE id=?', [req.params.id]);
  res.json(results[0]);

})

// (crUd : UPDATE) Mise à jour d'une transaction bancaire
server.put('/transactions/:id', async (req, res) => {
  const connection = await createConnection();
  const transactionId = req.params.id;
  const updatedTransaction = req.body;

  await connection.query('UPDATE transaction SET client_sender=?, client_receiver=?, amount=?, date=?, comment=? WHERE id=?',
      [updatedTransaction.client_sender, updatedTransaction.client_receiver, updatedTransaction.amount, updatedTransaction.date, updatedTransaction.comment, transactionId]);

  res.sendStatus(200);
});

// (cruD : DELETE) Supression d'une transaction bancaire
server.delete('/transactions/:id', async (req, res) => {
  const connection = await createConnection();
  const transactionId = req.params.id;

  await connection.query('DELETE FROM transaction WHERE id = ?', [transactionId]);
  return res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`server Up ! and listening on port ${port}`)
})