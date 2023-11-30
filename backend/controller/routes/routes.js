const controllers = require('../controllers')

// middleware verification
const transactionAmountValidate = require('../middleware/transactionAmountValidate.js')
const transactionIdValidate = require('../middleware/transactionIdValidate.js')

module.exports = (app) => {
    // (Crud : CREATE) Création d'une nouvelle transaction bancaire
    app.post("/transactions", transactionAmountValidate, controllers.newTransactionController);
    app.get("/transactions", controllers.getAllTransactionsController);
    app.get("/transactions/:id", transactionIdValidate, controllers.getTransactionByIdController);    
}
