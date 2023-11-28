import express from "express";
import createConnection from "./db_connection.js";

const server = express();
const port = 3000;

server.use(express.json()); // NE PAS OUBLIER !!!

server.get('/transactions', async (req, res) => {
  const connection = await createConnection();

  const results = await connection.query('SELECT * from transaction');
  res.json(results[0]);
});

server.get('/transactions/:id', async (req, res) => {
  const connection = await createConnection();

  const results = await connection.query('SELECT * from transaction WHERE id=?', [req.params.id]);
  res.json(results[0]);

})

server.post('/transactions', async (req, res) => {
  
  const connection = await createConnection();
  const transaction = req.body;

  await connection.query('INSERT INTO transaction(client_sender, client_receiver, amount, date) VALUES(?, ?, ?, ?)', [transaction.client_sender, transaction.client_receiver, transaction.amount, transaction.date]);

  res.sendStatus(200);
})


server.listen(port, () => {
  console.log(`server Up ! and listening on port ${port}`)
})