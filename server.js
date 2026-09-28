const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let movies = [
  { id: 1, title: "The Odyssey", genre: "Action", year: 2026 },
  { id: 2, title: "	Spider-Man: Brand New Day", genre: "Superhero", year: 2026 },
  { id: 3, title: "Superman", genre: "Superhero", year: 2025 },
];

let nextId = 4;

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

app.post("/api/movies", (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre || !year) {
    return res.status(400).json({ error: "title, genre, and year are required" });
  }

  const movie = { id: nextId++, title, genre, year };
  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
