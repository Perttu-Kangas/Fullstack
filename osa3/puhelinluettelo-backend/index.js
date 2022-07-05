require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  //if (persons.find((person) => person.name === body.name)) {
  //  return res.status(400).json({
  //    error: "name must be unique",
  //  });
  //}

  const personObject = new Person({
    name: body.name,
    number: body.number,
  });

  personObject.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((person) => {
    res.status(204).end();
  });
});

app.get("/info", (req, res) => {
  Person.find({})
    .count()
    .then((count) => {
      res.send(`Phonebook has info for ${count} people. <br>` + new Date());
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
