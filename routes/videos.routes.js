import { Router } from "express";

import { videosControllers } from "../controllers/videos.controllers.js";

const router = Router();

router.get("/", videosControllers.getAll);
router.get("/:id", videosControllers.getById);
router.get("/slug/:slug", videosControllers.getBySlug);
router.get("/user/:id", videosControllers.getByUserId);
router.post("/", videosControllers.create);
router.put("/:id", videosControllers.update);
router.delete("/:id", videosControllers.remove);

export default router;
