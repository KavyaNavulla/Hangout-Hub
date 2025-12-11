import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return Response.json({ error: "All fields required" }, { status: 400 });
        }

        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            return Response.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashed,
        });

        return Response.json({ message: "User registered" }, { status: 201 });

    } catch (error) {
        console.log("Register Error:", error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
