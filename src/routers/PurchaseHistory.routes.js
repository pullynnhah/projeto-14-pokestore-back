import express from "express";

import * as purchaseHistoryController from "../controllers/PurchaseHistory.controller.js";

const router = express.Router();

router.get("/history", purchaseHistoryController.getHistory)

export default router;