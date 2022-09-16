import db from "../database/Mongo.js";
import {StatusCodes} from "http-status-codes";

import dotenv from "dotenv";

dotenv.config();

const populatePokemonsDb = async (req, res) => {
  const pokemons = req.body;
  try {
    await db.collection("Pokemons").insertMany(pokemons);
    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getPopulatedPokemonsDb = async (req, res) => {
  try {
    const pokemons = await db.collection("Pokemons").find().toArray();
    res.send(pokemons).status(StatusCodes.ACCEPTED);
  } catch (error) {
    console.log(error.message);
    res.send(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {populatePokemonsDb, getPopulatedPokemonsDb};
