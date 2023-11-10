const fs = require('fs').promises;
const path = require('path');

const pathJSON = path.join(__dirname, 'talker.json');

const readFile = async () => {
  try {
    const file = await fs.readFile(pathJSON, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.error(error, 'linha talker');
    return { data: null, error: error.message };
  }
};
// ----------------------------------------------------------------------------
const getPeopleId = async (id) => {
  const people = await readFile();
  if (people.error) {
    console.error('Erro ao ler o arquivo:', people.error);
    return null;
  }

  const peopleFound = people.find((person) => person.id === Number(id));
  return peopleFound;
};

const postPeople = async (people) => {
  try {
    const data = await readFile();
    const newPeople = [...data, people];
    await fs.writeFile(pathJSON, JSON.stringify(newPeople));
  } catch (error) {
    console.error(error, 'postar pessoas');
    return { error: error.message };
  }
};

module.exports = {
  readFile,
  getPeopleId,
  postPeople,
};
