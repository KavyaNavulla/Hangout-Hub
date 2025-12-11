import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const token = cookies().get("token")?.value;

        if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, "SECRET123");
        const userId = decoded.id;

        const { commentId, reply } = await req.json();

        await connectDB();

        const plan = await Plan.findById(id);

        if (!plan) {
            return Response.json({ error: "Plan not found" }, { status: 404 });
        }

        // 🔥 ONLY CREATOR CAN REPLY
        if (plan.creatorId.toString() !== userId) {
            return Response.json({ error: "Only creator can reply" }, { status: 403 });
        }

        // Find comment
        const comment = plan.comments.id(commentId);
        if (!comment) {
            return Response.json({ error: "Comment not found" }, { status: 404 });
        }

        // Add reply
        comment.reply = reply;
        comment.repliedAt = new Date();

        await plan.save();

        return Response.json({ message: "Reply added", plan }, { status: 200 });

    } catch (err) {
        console.log("Reply Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
