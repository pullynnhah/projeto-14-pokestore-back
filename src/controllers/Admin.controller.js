import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

import dotenv from "dotenv";

dotenv.config();

const populatePokemonsDb = async (req, res) => {
  const adminPass = req.headers.password;
  if (adminPass === process.env.PASSWORD_DB) {
    const pokemons = req.body;
    try {
      await db.collection("Pokemons").insertMany(pokemons);
      res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      console.log(error.message);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

const getPopulatedPokemonsDb = async (req, res) => {
  const adminPass = req.headers.password;
  if (adminPass === process.env.PASSWORD_DB) {
    try {
      const pokemons = await db.collection("Pokemons").find().toArray();
      res.send(pokemons).status(StatusCodes.ACCEPTED);
    } catch (error) {
      console.log(error.message);
      res.send(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

export {populatePokemonsDb, getPopulatedPokemonsDb};
