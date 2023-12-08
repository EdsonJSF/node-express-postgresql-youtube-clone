import { Router } from "express";
import { check } from "express-validator";

import { videosControllers } from "../controllers/videos.controllers.js";
import {
  validateFields,
  validateVideoId,
  validateVideoSlug,
  validateVideoUserId,
} from "../middlewares/index.js";

const router = Router();

router.get("/", videosControllers.getAll);

router.get(
  "/:id",
  [check("id").custom(validateVideoId), validateFields],
  videosControllers.getById
);

router.get(
  "/slug/:slug",
  [check("slug").custom(validateVideoSlug), validateFields],
  videosControllers.getBySlug
);

router.get(
  "/user/:id",
  [check("id").custom(validateVideoUserId), validateFields],
  videosControllers.getByUserId
);

router.post(
  "/",
  [
    check("user_id", "Invalid user id").isNumeric().not().isEmpty(),
    check("link", "Invalid link").not().isEmpty(),
    check("title", "Invalid title").not().isEmpty(),
    validateFields,
  ],
  videosControllers.create
);

router.put(
  "/:id",
  [
    check("id").custom(validateVideoId),
    check("link", "Invalid link").not().isEmpty(),
    check("title", "Invalid title").not().isEmpty(),
    check("description", "Invalid description").not().isEmpty(),
    check("poster", "Invalid poster").not().isEmpty(),
    validateFields,
  ],
  videosControllers.update
);

router.delete(
  "/:id",
  [check("id").custom(validateVideoId), validateFields],
  videosControllers.remove
);

export default router;
