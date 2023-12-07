import express from "express";
import "dotenv/config";

import videosRoutes from "./routes/videos.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8001;

app.use("/api/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`App listening at: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
