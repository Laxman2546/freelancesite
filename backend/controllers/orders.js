import orderModel from "../models/ordersModel.js";

export const createOrder = async (req, res) => {
  try {
    const { gigId } = req.body;
    const { userId } = req.user;
    const { freelancerId } = req.body;

    if (!gigId || !userId || !freelancerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const checkOrder = await orderModel.findOne({
      gigId,
      clientId: userId,
      freelancerId,
    });
    if (checkOrder) {
      return res.status(400).json({ error: "Order already exists" });
    }
    const createOrder = await orderModel.create({
      gigId,
      clientId: userId,
      freelancerId: freelancerId,
    });
    return res.status(200).json({ createOrder });
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
    const getOrders = await orderModel.find({ clientId: userId });
    return res.status(200).json({ getOrders });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "something went wrong while getting orders", e });
  }
};
