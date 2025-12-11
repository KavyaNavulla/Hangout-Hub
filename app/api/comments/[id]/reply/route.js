import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
    try {
        const { id: commentId } = await params;

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, "SECRET123");
        const userId = decoded.id;

        // Get reply text
        const formData = await req.formData();
        const text = formData.get("text");

        if (!text?.trim()) {
            return Response.json({ error: "Reply cannot be empty" }, { status: 400 });
        }

        await connectDB();

        // Check if user is creator of the plan
        const comment = await Comment.findById(commentId);
        const plan = await Plan.findById(comment.planId);

        if (plan.creatorId.toString() !== userId.toString()) {
            return Response.json({ error: "Only creator can reply" }, { status: 403 });
        }

        // Add reply
        comment.replies.push({ userId, text });
        await comment.save();

        return Response.json({ 
            message: "Reply posted successfully",
            reply: comment.replies[comment.replies.length - 1]
        }, { status: 201 });
    } catch (err) {
        console.log("Reply Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
