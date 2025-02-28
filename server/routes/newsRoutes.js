import express from "express";

import { getNews, getNewsById, getNewsByTag, createNews, deleteNews, likeNews, 
    getNewsStats } from "../controllers/newsController.js";

const router = express.Router();

router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.get("/news/tag/:tag", getNewsByTag);
router.post("/news", createNews);
router.delete("/news/:id", deleteNews);
router.post("/news/:id/like", likeNews);
router.get("/news/stats", getNewsStats);

export default router;
