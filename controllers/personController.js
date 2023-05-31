import Person from "../models/Person.js";

const getPersons = async (req, res) => {
  try {
    const persons = await Person.find({});

    res.status(200).json(persons);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getPersonByID = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const editPersons = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, req.body);
    if (!person) {
      return res.status(400).json({ message: `cannot find person with ${id}` });
    }
    const updatedPerson = await Person.findById(id);
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(204).json({ message: error.message });
  }
};

const deletePersons = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {}
};

export default {
  getPersons,
  getPersonByID,
  createPerson,
  editPersons,
  deletePersons,
};
