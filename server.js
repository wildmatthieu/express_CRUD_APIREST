import express from "express";
import createConnection from "./db_connection.js";

const server = express();
const port = 3000;

server.use(express.json()); // NE PAS OUBLIER !!!

// (Crud : CREATE) Création d'une nouvelle transaction bancaire
server.post("/transactions", async (req, res) => {
  const connection = await createConnection();
  const transaction = req.body;

  // patate chaude : /!\ le montant de la transaction dépasse les 100000 ou est inférieur à 1
  if (transaction.amount > 100000 || transaction.amount < 1) {
    return res
      .status(400)
      .json({
        error:
          "Invalid transaction amount.",
      });
  }

  await connection.query(
    "INSERT INTO transaction(client_sender, client_receiver, amount, date, comment) VALUES(?, ?, ?, ?, ?)",
    [
      transaction.client_sender,
      transaction.client_receiver,
      transaction.amount,
      transaction.date,
      transaction.comment,
    ]
  );

  res.sendStatus(200);
});

// (cRud : READ) Lecture de toutes les transactions bancaires
server.get("/transactions", async (req, res) => {
  const connection = await createConnection();

  const results = await connection.query("SELECT * from transaction");
  res.json(results[0]);
});

// (cRud : READ) Lecture d'une transactions bancaires
server.get("/transactions/:id", async (req, res) => {
  const connection = await createConnection();
  const transactionId = req.params.id;

  // patate chaude : /!\ l'id n'est pas un nombre entier
  if (Number.isInteger(parseInt(transactionId)) === false) {
    return res.status(400).json({ error: "Invalid ID. Must be an integer." });
  }

  const results = await connection.query(
    "SELECT * from transaction WHERE id=?",
    [transactionId]
  );
  res.json(results[0]);
});

// (crUd : UPDATE) Mise à jour d'une transaction bancaire
server.put("/transactions/:id", async (req, res) => {
  const connection = await createConnection();
  const transactionId = req.params.id;
  const updatedTransaction = req.body;

  // patate chaude : /!\ l'id n'est pas un nombre entier
  if (!Number.isInteger(parseInt(transactionId))) {
    return res.status(400).json({ error: "Invalid ID. Must be an integer." });
  }

  // patate chaude : /!\ le montant de la transaction dépasse les 100000 ou est inférieur à 1
  if (updatedTransaction.amount > 100000 || updatedTransaction.amount < 1) {
    return res
      .status(400)
      .json({
        error:
          "Invalid transaction amount.",
      });
  }

  await connection.query(
    "UPDATE transaction SET client_sender=?, client_receiver=?, amount=?, date=?, comment=? WHERE id=?",
    [
      updatedTransaction.client_sender,
      updatedTransaction.client_receiver,
      updatedTransaction.amount,
      updatedTransaction.date,
      updatedTransaction.comment,
      transactionId,
    ]
  );

  res.sendStatus(200);
});

// (cruD : DELETE) Suppression d'une transaction bancaire
server.delete("/transactions/:id", async (req, res) => {
  const connection = await createConnection();
  const transactionId = req.params.id;

  // patate chaude : /!\ l'id n'est pas un nombre entier
  if (!Number.isInteger(parseInt(transactionId))) {
    return res.status(400).json({ error: "Invalid ID. Must be an integer." });
  }

  await connection.query("DELETE FROM transaction WHERE id = ?", [
    transactionId,
  ]);
  return res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`server Up ! and listening on port ${port}`);
});
