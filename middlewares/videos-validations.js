import { videosModel } from "../models/videos.model.js";

export const validateVideoId = async (id = "") => {
  const { rows: data } = await videosModel.getById(id);

  if (data.length === 0) {
    throw new Error(`Video ${id} does not exist`);
  }
};

export const validateVideoSlug = async (slug = "") => {
  const { rows: data } = await videosModel.getBySlug(slug);

  if (data.length === 0) {
    throw new Error(`Video slug ${slug} does not exist`);
  }
};

export const validateVideoUserId = async (id = "") => {
  const { rows: data } = await videosModel.getByUserId(id);

  if (data.length === 0) {
    throw new Error(`Video with user ${id} does not exist`);
  }
};

export const validateVideoOwner = async (req, res, next) => {
  const { id } = req.params;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { rows } = await videosModel.getById(id);

  if (rows.length === 0) {
    return res.status(400).json({
      message: `Video ${id} does not exist`,
      errors: [],
    });
  }

  const { user_id: video_user_id } = rows[0];
  const { id: user_id, role } = user;

  if (role === "admin") {
  } else if (video_user_id !== user_id) {
    return res.status(401).json({
      message: "Owner no authorizate",
      errors: [],
    });
  }

  next();
};
