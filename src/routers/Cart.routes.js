import express from "express";

import * as cartController from "../controllers/Cart.controller.js";
import UserMiddleware from "../midllewares/User.middleware.js";

const router = express.Router();

router.use(UserMiddleware);
router.post("/cart", cartController.postProduct);
router.get("/cart", cartController.getProducts);

router.post("/cart/:id", cartController.removeProduct);
router.post("/checkout", cartController.checkoutProducts);

export default router;
