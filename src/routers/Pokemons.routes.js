import express from "express";

import * as pokemonsController from "../controllers/Pokemons.controller.js";

const router = express.Router();

router.get("/pokemons", pokemonsController.getPokemons)

export default router;