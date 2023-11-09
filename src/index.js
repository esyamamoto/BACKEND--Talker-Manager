const express = require('express');
const { readFile, getPeopleId } = require('./talker');
const requestToken = require('./services/token');
const { emailOK } = require('./services/emailOk')
const { passwordOK } = require('./services/passwordOk');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
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
    console.error('linha index');
    return console.log(error); // mudar aqui tbm um return valido para o client
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
  return res.status(200).json({ token }); // mudar aqui tbm um return valido para o client
});
//-----------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
