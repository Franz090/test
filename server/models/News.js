import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: String,
    text: String,
    images: [String],
    tags: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
}, { timestamps: true });


const News = mongoose.model("News", NewsSchema);

export default News; 
