import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        // ✅ Get cookies *from the request*
        const cookieStore = req.cookies;
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, "SECRET123");
        const userId = decoded.id;

        const body = await req.json();
        const { title, description, budget, timeline, images } = body;

        await connectDB();

        const newPlan = await Plan.create({
            title,
            description,
            budget,
            timeline,
            images,
            creatorId: userId,
        });

        return Response.json(
            { message: "Plan created", plan: newPlan },
            { status: 201 }
        );

    } catch (err) {
        console.log("Plan Create Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
