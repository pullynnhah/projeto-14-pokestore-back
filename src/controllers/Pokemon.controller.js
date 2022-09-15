import db from "../database/Mongo.js";
import {StatusCodes} from "http-status-codes";

const getPokemon = async (req, res) => {
  const pokedexNumber = Number(req.params.pokedexNumber);
  try {
    const pokemon = await db.collection("Pokemons").findOne({pokedexNumber});
    res.status(StatusCodes.OK).send(pokemon);
  } catch (error) {
    console.log(error.message);
    res.send(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {getPokemon};
