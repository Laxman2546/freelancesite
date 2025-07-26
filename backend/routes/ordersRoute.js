import express from "express";
const router = express.Router();

import isloggedin from "../middelware/isloggedIn.js";
import { createOrder, getOrders, getOne } from "../controllers/orders.js";

router.post("/", isloggedin, createOrder);
router.post("/getone", isloggedin, getOne);
router.get("/getorders", isloggedin, getOrders);

export default router;
