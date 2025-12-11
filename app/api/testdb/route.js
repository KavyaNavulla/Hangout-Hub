import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    await connectDB();
    const count = await User.countDocuments();
    return Response.json({ ok: true, users: count });
}
