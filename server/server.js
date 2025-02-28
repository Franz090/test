import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import newsRoutes from "./routes/newsRoutes.js"; 

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

app.use("/api", newsRoutes); 
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
