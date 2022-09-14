import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from './database/Mongo.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.get("/admin", async (req, res) => {
  try {
    const pokemons = await db.collection('Pokemons').find().toArray();
    res.send(pokemons).status(200);
  } catch (error) {
    console.log(error.message)
    res.send(500);
  }
});

app.post("/admin", async (req, res) => {
  const pokemons = req.body;
  try {
    await db.collection('Pokemons').insertMany(pokemons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));
