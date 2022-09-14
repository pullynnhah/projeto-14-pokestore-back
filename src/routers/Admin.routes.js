import express from "express";

import * as adminController from "../controllers/Admin.controller.js";

const router = express.Router();

router.post("/admin", adminController.populatePokemonsDb);
router.get("/admin", adminController.getPopulatedPokemonsDb)

export default router;