import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return Response.json({ error: "All fields required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

        // Set auth cookie
        return new Response(
            JSON.stringify({ message: "Login success" }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {
        console.log("Login Error:", error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
