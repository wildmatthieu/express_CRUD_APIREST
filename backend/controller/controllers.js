const queries = require("../modele/db_queries.js")

const newTransactionController = async (req, res) => {
    await queries.newTransaction(req);
    return res.sendStatus(200);
}

const getAllTransactionsController = async (req, res) => {
    const result = await queries.getAllTransactions();
    return res.json(result);
}

const getTransactionByIdController = async (req, res) => {
    const result = await queries.getTransactionById(req); 
    return res.json(result[0]);
}

const deleteTransactionByIdController = async (req, res) => {
    await queries.deleteTransactionById(req);
    return res.sendStatus(200);
}


module.exports = {
    newTransactionController,
    getAllTransactionsController,
    getTransactionByIdController,
    deleteTransactionByIdController
}