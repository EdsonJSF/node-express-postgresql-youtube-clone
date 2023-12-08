import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import usersRoutes from "./routes/users.routes.js";
import videosRoutes from "./routes/videos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8001;

/* ROUTES */
app.use("/api/login", authRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`App listening at: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
