import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET() {
    try {
        await connectDB();
        const plans = await Plan.find().sort({ createdAt: -1 }).lean();  // <-- add lean()
        return Response.json(plans, { status: 200 });
    } catch (err) {
        console.log("Plan Fetch Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
