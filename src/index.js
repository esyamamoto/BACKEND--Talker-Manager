const express = require('express');
const { readFile, getPeopleId } = require('./talker');
const requestToken = require('./services/requestToken');
const emailOK = require('./services/emailOk');
const passwordOK = require('./services/passwordOk');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 400;
const PORT = process.env.PORT || '3001';

// ---------------------------------------------------------------------
app.get('/talker', async (req, res) => {
  try {
    const data = await readFile();
    if (!data.length) {
      return res.status(HTTP_OK_STATUS).json([]);
    }
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    console.error('Erro na rota /talker:', error);
    return res.status(HTTP_ERROR_STATUS).json({ error: error.message });
  }
});
// ----------------------------------------------------------------------
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talking = await getPeopleId(id);
  if (talking) {
    return res.status(200).json(talking);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
// ---------------------------------------------------------------------------
app.post('/login', passwordOK, emailOK, async (req, res) => {
  const token = requestToken();
  const response = {
    success: true,
    message: 'Login successful',
    token,
  };
  return res.status(200).json(response);
});
//-----------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
