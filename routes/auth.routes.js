import { Router } from "express";
import { check } from "express-validator";

import { authControllers } from "../controllers/auth.controllers.js";
import { validateFields } from "../middlewares/index.js";

const router = Router();

router.post(
  "/email",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").not().isEmpty(),
    validateFields,
  ],
  authControllers.login
);

export default router;
