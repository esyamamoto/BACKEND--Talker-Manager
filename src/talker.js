const fs = require('fs').promises;

const path = require('path');

const pathJSON = path.join(__dirname, 'talker.json'); // path e  join nao precisa dar barra

const readFile = async () => {
  try {
    const file = await fs.readFile(pathJSON, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.error(error, 'linha talker');
    return null; // fazer de novo essa partee
  }
};

// ----------------------------------------------------------
const getPeopleId = async (id) => {
  const people = await readFile();
  const peopleFound = people.find((person) => person.id === Number(id));
  return peopleFound;
};

module.exports = {
  readFile,
  getPeopleId,
};