require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// Create express server
const app = express();
// Middlewares
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
// Requestlogger middleware
app.use(
  morgan(function (tokens, req, res) {
    console.log(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req.method === "POST" ? JSON.stringify(req.body) : "", // show data on POST reque // show data on POST requestssts
    ].join(" ");
  })
);
// Custom errorhandler middlware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.set("Content-Type", "text/html");
    response.send(`
			<p>Phone has info for ${persons.length} people</p>
			<p>${new Date().toString()}</p>
		`);
  });
});
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (!body.name) return response.status(404).json({ error: "name missing" });
  else if (!body.number)
    return response.status(404).json({ error: "number missing" });
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});
const generateId = () => {
  /*
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
	*/
  return Math.floor(Math.random() * 10000); // Return random for now...
};
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) return response.status(404).json({ error: "name missing" });
  else if (!body.number)
    return response.status(404).json({ error: "number missing" });
  else if (persons.find((p) => p.name === body.name))
    return response.status(404).json({ error: "name must be unique" });

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
