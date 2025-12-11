import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        bio: { type: String, default: "" },
        image: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
