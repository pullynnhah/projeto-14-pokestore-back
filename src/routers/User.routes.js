import express from "express";

import * as userController from "../controllers/user.controller.js";
import hasUser from "../midllewares/User.middleware.js";
import authorization from "../midllewares/Authorization.middleware.js";

const router = express.Router();

router.get("/user", hasUser, authorization, userController.userContent);

export default router;