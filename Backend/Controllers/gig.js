import userModel from "../models/registrationModel.js";
import gigModel from "../models/gigCreationModel.js";
import { getUserData } from "../utils/fetchUser.js";
import { deleteThumbnail } from "../middelware/imageUpload.js";
export const gigPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserData(userId);
    if (!user) {
      if (req.file?.filename) {
        await deleteThumbnail(req.file.filename);
        console.log("sucessfully deleted");
      }
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }
    let { title, category, searchTags, pricing, description } = req.body;

    const checkExisitingGig = await gigModel.findOne({
      title,
      category,
      userId,
    });
    if (checkExisitingGig) {
      if (req.file?.filename) {
        await deleteThumbnail(req.file.filename);
        console.log("sucessfully deleted");
      }
      return res.status(409).json({ error: "Gig already created" });
    }

    try {
      if (typeof searchTags === "string") searchTags = JSON.parse(searchTags);
    } catch (e) {
      searchTags = [];
    }
    try {
      if (typeof pricing === "string") pricing = JSON.parse(pricing);
    } catch (e) {
      pricing = {};
    }

    const createGig = await gigModel.create({
      userId,
      title,
      category,
      searchTags,
      pricing,
      description,
      thumbnail: req.file?.filename,
    });

    return res.status(201).json({ success: true, gig: createGig });
  } catch (e) {
    console.error("Error while creating a gig:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong while creating a gig", e });
  }
};

export const updategigPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const fetchUser = await getUserData(userId);
    if (!fetchUser) {
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }
    const { gigId } = req.body;
    const getgig = await gigModel.findByIdAndUpdate({ _id: gigId }).lean();
    if (getgig) {
      return res
        .status(200)
        .json({ success: "gig fetched successfully", gig: getgig });
    } else {
      return res.status(400).json({ error: "something went wrong try again!" });
    }
  } catch (e) {
    console.log("error occurs while getting gigs", e);
    return res
      .status(500)
      .json({ error: "something went worng while getting gigs" });
  }
};
export const getallgigPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const fetchUser = await getUserData(userId);
    if (!fetchUser) {
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }
    const getGigs = await gigModel.find({ userId }).lean();
    if (getGigs) {
      return res.status(200).json({ success: "fetched gigs", getGigs });
    } else {
      return res.status(200).json({ success: "No gigs created" });
    }
  } catch (e) {
    console.log("error occurs while getting gigs", e);
    return res
      .status(500)
      .json({ error: "something went worng while getting gigs" });
  }
};
export const deletegigPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const fetchUser = await getUserData(userId);
    if (!fetchUser) {
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }
    const { gigId } = req.body;
    const deleteGig = await gigModel.findOneAndDelete({ _id: gigId }).lean();
    if (deleteGig) {
      return res
        .status(200)
        .json({ success: "gig deleted sucessfully", deleteGig });
    } else {
      return res.status(400).json({ error: "something went wrong trt again!" });
    }
  } catch (e) {
    console.log("error occurs while getting gigs", e);
    return res
      .status(500)
      .json({ error: "something went worng while getting gigs" });
  }
};
export const getOnegig = async (req, res) => {
  try {
    const { userId } = req.user;
    const fetchUser = await getUserData(userId);
    if (!fetchUser) {
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }
    const { gigId } = req.body;
    const getgig = await gigModel.findById({ _id: gigId }).lean();
    if (getgig) {
      return res
        .status(200)
        .json({ success: "gig fetched successfully", gig: getgig });
    } else {
      return res.status(400).json({ error: "something went wrong try again!" });
    }
  } catch (e) {
    console.log("error occurs while getting gigs", e);
    return res
      .status(500)
      .json({ error: "something went worng while getting gigs" });
  }
};
