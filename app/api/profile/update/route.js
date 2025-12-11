import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = jwt.verify(token, "SECRET123");

        const formData = await req.formData();
        const name = formData.get("name");
        const bio = formData.get("bio");   // <-- IMPORTANT

        if (!name || !name.trim()) {
            return Response.json({ error: "Name cannot be empty" }, { status: 400 });
        }

        // ✅ Update BOTH name and bio
        await User.findByIdAndUpdate(id, {
            name,
            bio
        });

        // Redirect back with success message
        return Response.redirect(new URL("/profile?updated=1", req.url));

    } catch (err) {
        console.log("Profile Update Error:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
