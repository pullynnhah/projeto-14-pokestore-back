import express from "express";

import * as authController from "../controllers/Auth.controller.js";
import hasUser from "../midllewares/User.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/logout", hasUser, authController.logout);

export default router;