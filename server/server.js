import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import newsRoutes from "./routes/newsRoutes.js"; 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", newsRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
