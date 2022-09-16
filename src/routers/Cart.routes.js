import express from "express";

import * as cartController from "../controllers/Cart.controller.js";
import UserMiddleware from "../midllewares/User.middleware.js";

const router = express.Router();

router.use(UserMiddleware);
router.post("/cart", cartController.postProduct);
router.get("/cart", cartController.getProduct);
router.post("/cart/:id", cartController.removeProduct);
router.post("/cart/checkout", cartController.checkoutProducts);

export default router;
