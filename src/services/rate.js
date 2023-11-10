const rateReq = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(400).json({ 
      message: 'O campo "rate" é obrigatório', 
    });
  }
  if (!Number.isInteger(Number(rate))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (!(Number(rate) >= 1 && Number(rate) <= 5)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  next();
};

module.exports = rateReq;