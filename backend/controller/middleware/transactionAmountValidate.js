const transactionAmountValidate = (req, res) => {
  const transaction = req.body;

  // patate chaude : /!\ le montant de la transaction dépasse les 100000 ou est inférieur à 1
  if (transaction.amount > 100000 || transaction.amount < 1) {
    return res.status(400).json({
      error: "Invalid transaction amount.",
    });
  }

  next();
};

module.exports = transactionAmountValidate;