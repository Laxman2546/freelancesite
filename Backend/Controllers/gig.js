import userModel from "../models/registrationModel.js";
import gigModel from "../models/gigCreationModel.js";
export const gigPost = async (req, res) => {
  try {
    const { userId } = req.user;

    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) {
      return res
        .status(404)
        .json({ error: "User not found while creating a gig" });
    }

    const { title, category, searchTags, pricing, description } = req.body;

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
  res.send("hello");
};
export const getgigPost = async (req, res) => {
  res.send("hello");
};
export const deletegigPost = async (req, res) => {
  res.send("hello");
};

