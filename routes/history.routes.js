import { Router } from "express";
import { check } from "express-validator";

import { historyControllers } from "../controllers/history.controllers.js";
import {
  validateFields,
  validateHistoryOwner,
  validateJWT,
  validateVideoId,
} from "../middlewares/index.js";

const router = Router();

router.get(
  "/:id",
  [check("id").not().isEmpty(), validateFields],
  historyControllers.getById
);

router.get(
  "/video/:id",
  [check("id").not().isEmpty(), validateFields],
  historyControllers.getByVideoId
);

router.get(
  "/user/:id",
  [check("id").not().isEmpty(), validateFields],
  historyControllers.getByUserId
);

router.post(
  "/",
  [
    validateJWT,
    check("video_id", "Invalid video id").isNumeric().not().isEmpty(),
    check("video_id").custom(validateVideoId),
    validateFields,
  ],
  historyControllers.create
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateHistoryOwner,
    check("id", "Invalid history id").not().isEmpty(),
    validateFields,
  ],
  historyControllers.remove
);

export default router;
