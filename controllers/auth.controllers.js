import { response } from "express";
import bcryptjs from "bcryptjs";

import { usersModel } from "../models/users.model.js";
import { generateJWT } from "../helpers/index.js";

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email
    const { rows } = await usersModel.getByEmail(email);

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Email / Password Invalid - email",
        errors: [1],
      });
    }

    const user = rows[0];

    // User is active ?
    if (!user.active) {
      return res.status(400).json({
        message: "Email / Password Invalid - state",
        errors: [2],
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Email / Password Invalid - pass",
        errors: [3],
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      message: "Login ok",
      data: [user],
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "An unspected error",
      errors: [],
    });
  }
};

export const authControllers = {
  login,
};
