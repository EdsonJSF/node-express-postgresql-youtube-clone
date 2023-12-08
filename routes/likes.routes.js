import { Router } from "express";
import { check } from "express-validator";

import { likesControllers } from "../controllers/likes.controllers.js";
import {
  validateFields,
  validateJWT,
  validateLikeOwner,
  validateVideoId,
} from "../middlewares/index.js";

const router = Router();

router.get(
  "/video/:id",
  [check("id").not().isEmpty(), validateFields],
  likesControllers.getByVideoId
);

router.get(
  "/user/:id",
  [check("id").not().isEmpty(), validateFields],
  likesControllers.getByUserId
);

router.post(
  "/",
  [
    validateJWT,
    check("video_id", "Invalid video id").isNumeric().not().isEmpty(),
    check("video_id").custom(validateVideoId),
    check("like", "Invalid like").isBoolean().not().isEmpty(),
    validateFields,
  ],
  likesControllers.create
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateLikeOwner,
    check("id", "Invalid video id").not().isEmpty(),
    validateFields,
  ],
  likesControllers.remove
);

export default router;
