import { commentsModel } from "../models/comments.model.js";

export const validateCommentOwner = async (req, res, next) => {
  const { id } = req.params;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { id: user_id, role } = user;

  const { rows } = await commentsModel.getById(id);

  if (rows.length === 0) {
    return res.status(400).json({
      message: `Comment does not exist`,
      errors: [],
    });
  }

  const { user_id: comment_user_id } = rows[0];

  if (role === "admin") {
  } else if (comment_user_id !== user_id) {
    return res.status(401).json({
      message: "Owner no authorizate",
      errors: [],
    });
  }

  next();
};
