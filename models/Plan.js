import mongoose from "mongoose";

const TimelineSchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    activity: String,
    location: String,
    travelTime: String,      // optional
    mapLink: String,         // Google Maps URL
});

const PlanSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        budget: Number,
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        timeline: [TimelineSchema],
        images: [String],

        votes: { type: Number, default: 0 },
        voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                question: String,
                createdAt: { type: Date, default: Date.now },

                reply: String,      // only creator replies
                repliedAt: Date,
            }
        ],

    },
    { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);



