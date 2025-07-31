import express from "express";
const router = express.Router();

import isloggedin from "../middelware/isloggedIn.js";
import {
  createOrder,
  getOrders,
  getOne,
  getFreelancerOrders,
  updateOrderData,
  getClientOrders,
} from "../controllers/orders.js";

router.post("/", isloggedin, createOrder);
router.post("/getone", isloggedin, getOne);
router.get("/getorders", isloggedin, getOrders);
router.get("/getfreelancerorders", isloggedin, getFreelancerOrders);
router.post("/update", isloggedin, updateOrderData);
router.post("/clientorder", isloggedin, getClientOrders);
export default router;
