import express from "express";
import cors from "cors";
import ideasRouter from "./routes/ideas";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/ideas", ideasRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
