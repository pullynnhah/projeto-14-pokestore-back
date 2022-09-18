import express from "express";

import * as pokemonController from "../controllers/Pokemon.controller.js";

const router = express.Router();

router.get("/pokemon/:pokedexNumber", pokemonController.getPokemon);

export default router;
