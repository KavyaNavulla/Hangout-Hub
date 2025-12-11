import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET() {
    await connectDB();
    const plans = await Plan.find().sort({ createdAt: -1 });
    return Response.json(plans);
}
