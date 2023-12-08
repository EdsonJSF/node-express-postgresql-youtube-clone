import { Router } from "express";
import { check } from "express-validator";

import { commentsControllers } from "../controllers/comments.controllers.js";
import {
  validateFields,
  validateJWT,
  validateCommentOwner,
  validateVideoId,
} from "../middlewares/index.js";

const router = Router();

router.get(
  "/video/:id",
  [check("id").not().isEmpty(), validateFields],
  commentsControllers.getByVideoId
);

router.get(
  "/user/:id",
  [check("id").not().isEmpty(), validateFields],
  commentsControllers.getByUserId
);

router.post(
  "/",
  [
    validateJWT,
    check("video_id", "Invalid video id").isNumeric().not().isEmpty(),
    check("video_id").custom(validateVideoId),
    check("title", "Invalid title").not().isEmpty(),
    check("body", "Invalid body").not().isEmpty(),
    validateFields,
  ],
  commentsControllers.create
);

router.put(
  "/:id",
  [
    validateJWT,
    validateCommentOwner,
    check("id", "Invalid comment id").not().isEmpty(),
    check("title", "Invalid title").not().isEmpty(),
    check("body", "Invalid body").not().isEmpty(),
    validateFields,
  ],
  commentsControllers.update
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateCommentOwner,
    check("id", "Invalid video id").not().isEmpty(),
    validateFields,
  ],
  commentsControllers.remove
);

export default router;
