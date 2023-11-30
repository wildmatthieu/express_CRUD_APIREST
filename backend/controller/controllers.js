const queries = require("../modele/db_queries.js")

const newTransactionController = (req, res) => {
    queries.newTransaction(req);
    return res.sendStatus(200);
}

const getAllTransactionsController = (req, res) => { 
    const result = queries.getAllTransactions();
    return res.json(result);
}

const getTransactionByIdController = (req, res) => {
    const result = queries.getTransactionById(req);    
    return res.json(result[0]);
}

module.exports = {
    newTransactionController,
    getAllTransactionsController,
    getTransactionByIdController
}