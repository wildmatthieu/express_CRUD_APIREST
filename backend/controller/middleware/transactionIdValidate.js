const transactionIdValidate = (req, res, next) => {
  const transactionId = req.params.id

  // patate chaude : /!\ l'id n'est pas un nombre entier
  if (Number.isInteger(parseInt(transactionId)) === false) {
    return res.status(400).json({ error: "Invalid ID. Must be an integer." });
  }

  next();
};

module.exports = transactionIdValidate;