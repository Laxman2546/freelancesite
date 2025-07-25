import express from "express";
const router = express.Router();

import isloggedin from "../middelware/isloggedIn.js";
import { createOrder, getOrders } from "../controllers/orders.js";

router.post("/", isloggedin, createOrder);
router.get("/getorders", isloggedin, getOrders);

export default router;
