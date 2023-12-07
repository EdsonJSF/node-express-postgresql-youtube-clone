import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.json({ data: true });
});

app.listen(PORT, () => {
  console.log(`App listening at: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
