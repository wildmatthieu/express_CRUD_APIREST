const createConnection = require("./db_connection.js");

const newTransaction = async (req) => {
  const transaction = req.body;

  const connection = await createConnection();
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
  connection.end();
};

const getAllTransactions = async () => {
  const connection = await createConnection();
  const datas = await connection.query("SELECT * from transaction");
  connection.end();
  return datas[0];
};

const getTransactionById = async (req) => {
  const transactionId = req.params.id
  const connection = await createConnection();
  const datas = await connection.query(
    "SELECT * from transaction WHERE id=?",
    [transactionId]
  );

  connection.end();
  return datas[0];
};

const deleteTransactionById = async (req) => {
  const transactionId = req.params.id
  
  const connection = await createConnection();
  await connection.query(
    "DELETE FROM transaction WHERE id=?",
    [transactionId]
  );

  connection.end();
  return true;
};

module.exports = {
  newTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransactionById
};
