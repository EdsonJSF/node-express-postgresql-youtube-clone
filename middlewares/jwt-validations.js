import jwt from "jsonwebtoken";

import { usersModel } from "../models/users.model.js";

export const validateJWT = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "You no have authorization",
      errors: [],
    });
  }

  try {
    const { user_id } = jwt.verify(token, process.env.SECRET_JWT);

    const { rows } = await usersModel.getById(user_id);

    if (rows.length === 0) {
      return res.status(401).json({
        message: `User no exist`,
        errors: [],
      });
    }

    const user = rows[0];

    if (!user.active) {
      return res.status(401).json({
        message: `The user: ${user.name} is disabled`,
        errors: [],
      });
    }

    req.getUser = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid Token",
      errors: [],
    });
  }
};
