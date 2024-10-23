const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

let persons = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456",
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345",
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
	},
];

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
	),
);

app.use(express.json());
app.use(cors());
const port = 3001;

generateId = () => {
	const lastId = persons.length ? Math.max(...persons.map(({ id }) => id)) : 0;
	return lastId + 1;
};

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/info", (request, response) => {
	const numberOfEntries = persons.length;
	const requestTime = new Date().toString();
	response.send(`
		 <html>
			  <body>
					<p>Phonebook has info for ${numberOfEntries} people</p>
					<p>${requestTime}</p>
			  </body>
		 </html>
	`);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => Number(person.id) === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).json({
			error: "no person found",
			request: {
				id: request.params.id,
			},
		});
	}
});

app.post("/api/persons", (request, response) => {
	const { name, number } = request.body;

	if (!name || !number) {
		return response.status(400).json({ error: "name or number missing" });
	}

	const nameExists = persons.some((person) => person.name === name);
	if (nameExists) {
		return response.status(400).json({ error: "name must be unique" });
	}

	const newPerson = { ...request.body, id: generateId };
	persons.push(newPerson);

	response.status(201).json(newPerson);
});
app.put("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const body = request.body;

	persons = persons.map((person) => {
		if (Number(person.id) === id) {
			return { ...body, id };
		}
		return person;
	});
	response.json(body);
});
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => Number(person.id) !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	const path = request.path;
	response.status(404).send({ error: "unknown endpoint", path });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
