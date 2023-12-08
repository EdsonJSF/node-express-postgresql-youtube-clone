import { likesModel } from "../models/likes.model.js";

export const validateLikeOwner = async (req, res, next) => {
  const { id: video_id } = req.params;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { id: user_id, role } = user;

  const { rows } = await likesModel.getByVideoAndUserId({ video_id, user_id });

  if (rows.length === 0) {
    return res.status(400).json({
      message: `Like does not exist`,
      errors: [],
    });
  }

  const { user_id: like_user_id } = rows[0];

  if (role === "admin") {
  } else if (like_user_id !== user_id) {
    return res.status(401).json({
      message: "Owner no authorizate",
      errors: [],
    });
  }

  next();
};
