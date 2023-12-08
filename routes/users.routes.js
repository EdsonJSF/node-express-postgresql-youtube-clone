import { Router } from "express";
import { check } from "express-validator";

import { usersControllers } from "../controllers/users.controllers.js";
import {
  validateFields,
  validateUserEmail,
  validateUserId,
} from "../middlewares/index.js";

const router = Router();

router.get("/", usersControllers.getAll);

router.get(
  "/:id",
  [check("id").custom(validateUserId), validateFields],
  usersControllers.getById
);

router.post(
  "/",
  [
    check("full_name", "Invalid name").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("email").custom(validateUserEmail),
    check("password", "Invalid password").isLength({ min: 6 }),
    check("birthdate", "Invalid email").not().isEmpty(),
    validateFields,
  ],
  usersControllers.create
);

router.put(
  "/:id",
  [
    check("id").custom(validateUserId),
    check("full_name", "Invalid name").not().isEmpty(),
    check("avatar", "Invalid avatar").not().isEmpty(),
    check("birthdate", "Invalid birthdate").not().isEmpty(),
    validateFields,
  ],
  usersControllers.update
);

router.delete(
  "/:id",
  [check("id").custom(validateUserId), validateFields],
  usersControllers.remove
);

export default router;
