import orderModel from "../models/ordersModel.js";
import gigModel from "../models/gigCreationModel.js";
import mongoose from "mongoose";
export const createOrder = async (req, res) => {
  try {
    const { gigId, freelancerId } = req.body;
    const { userId } = req.user;

    console.log("gigId:", gigId);
    console.log("userId (client):", userId);
    console.log("freelancerId (raw):", freelancerId);

    if (!gigId || !userId || !freelancerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
      return res.status(400).json({ error: "Invalid freelancer ID" });
    }

    const checkOrder = await orderModel.findOne({
      gigId,
      clientId: userId,
      freelancerId: new mongoose.Types.ObjectId(freelancerId),
    });

    if (checkOrder) {
      return res.status(400).json({ error: "Order already exists" });
    }

    const gigDetails = await gigModel.findById(gigId);
    if (!gigDetails) {
      return res.status(404).json({ error: "Gig not found" });
    }

    const createOrder = await orderModel.create({
      gigId,
      clientId: userId,
      freelancerId: new mongoose.Types.ObjectId(freelancerId),
    });

    return res.status(200).json({ createOrder, gigDetails });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "something went wrong white ordering", e });
  }
};
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).json({ error: "Please login again" });
    }
    const getOrders = await orderModel
      .find({ clientId: userId })
      .populate("gigId");
    return res.status(200).json({ getOrders });
  } catch (e) {
    return res.status(500).json({
      error: "something went wrong while getting orders",
      e,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Please login again" });
    }
    if (!orderId) {
      return res.status(400).json({ error: "no order id found" });
    }
    const getOrders = await orderModel.findById(orderId);
    return res.status(200).json({ getOrders });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "something went wrong while getting orders",
      e,
    });
  }
};

export const getFreelancerOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).json({ error: "Please login again" });
    }
    const getOrders = await orderModel
      .find({ freelancerId: userId })
      .populate("gigId");
    return res.status(200).json({ getOrders });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "something went wrong while getting orders",
      e,
    });
  }
};

export const updateorderData = async (req, res) => {
  try {
    const { requirements } = req.body;
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "no order id found" });
    }
    const orderUpdate = orderModel.findByIdAndUpdate(
      orderId,
      { requirements },
      { new: true }
    );
    console.log(orderUpdate);
    return res.status(200).json({ orderUpdate });
  } catch (e) {
    console.log("error in the update", e);
    return res.status(500).json({ error: "something went wrong" });
  }
};
