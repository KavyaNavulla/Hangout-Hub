import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const cookieStore = await cookies(); // ✔ FIX
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, "SECRET123");
        const userId = decoded.id;

        const formData = await req.formData(); // since using form POST
        const planId = formData.get("planId");
        const text = formData.get("text");

        if (!text?.trim()) {
            return Response.json({ error: "Comment cannot be empty" }, { status: 400 });
        }

        const comment = await Comment.create({
            planId,
            userId,
            text
        });

        return Response.json({ 
            message: "Comment posted successfully",
            comment 
        }, { status: 201 });
    } catch (err) {
        console.log("Comment Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();

        const planId = req.nextUrl.searchParams.get("id");

        const comments = await Comment.find({ planId })
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        return Response.json({ comments });
    } catch (err) {
        console.log(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
