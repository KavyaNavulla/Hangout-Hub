import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String
    },
    { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
    {
        planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        replies: [ReplySchema]    // ⭐ ADD THIS
    },
    { timestamps: true }
);

export default mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema);
