import express from "express";

import * as userController from "../controllers/user.controller.js";
import hasUser from "../midllewares/User.middleware.js";

const router = express.Router();

router.post("/user", hasUser, userController.userContent);

export default router;