const watchedAtReq = (req, res, next) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" é obrigatório', 
    });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
module.exports = watchedAtReq;
