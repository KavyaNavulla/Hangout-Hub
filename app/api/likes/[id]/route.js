import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
    try {
        await connectDB();

        // FIX: unwrap params
        const { id } = await params;

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = jwt.verify(token, "SECRET123").id;

        const plan = await Plan.findById(id);
        if (!plan) {
            return Response.json({ error: "Plan not found" }, { status: 404 });
        }

        // If already liked → ignore
        if (plan.voters.includes(userId)) {
            //return Response.redirect(`/plan/${id}`);
            return Response.redirect(new URL(`/plan/${id}`, req.url));

        }

        plan.voters.push(userId);
        plan.votes += 1;

        await plan.save();

        //return Response.redirect(`/plan/${id}`);
        return Response.redirect(new URL(`/plan/${id}`, req.url));


    } catch (err) {
        console.log("LIKE API ERROR:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
