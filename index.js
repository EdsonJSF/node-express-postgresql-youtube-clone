import express from "express";
import cors from "cors";
import "dotenv/config";

import videosRoutes from "./routes/videos.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8001;

/* ROUTES */
app.use("/api/videos", videosRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`App listening at: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
