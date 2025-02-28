import News from "../models/News.js";

// Get paginated news
export async function getNews(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const news = await News.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get news by ID
export async function getNewsById(req, res) {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ error: "News not found" });

        news.views += 1; // Increment views
        await news.save();
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get news by tag
export async function getNewsByTag(req, res) {
    try {
        const news = await News.find({ tags: req.params.tag });
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create news (Admin only)
export async function createNews(req, res) {
    try {
        const { title, text, images, tags } = req.body;
        const news = new News({ title, text, images, tags });
        await news.save();
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete news
export async function deleteNews(req, res) {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: "News deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Like/unlike news
export async function likeNews(req, res) {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ error: "News not found" });

        const userId = req.body.userId; // Assume may userId sa request body
        if (!news.likedBy) news.likedBy = []; // Ensure likedBy exists
        const hasLiked = news.likedBy.includes(userId);

        if (hasLiked) {
            news.likes -= 1;
            news.likedBy = news.likedBy.filter(id => id !== userId);
        } else {
            news.likes += 1;
            news.likedBy.push(userId);
        }

        await news.save();
        res.json({ likes: news.likes, likedBy: news.likedBy });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get statistics (total views)
export async function getNewsStats(req, res) {
    try {
        const totalViews = await News.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
        res.json({ totalViews: totalViews[0]?.total || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
