import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return <p className="text-white p-6">Not logged in</p>;
    }

    const { id } = jwt.verify(token, "SECRET123");

    await connectDB();
    const user = await User.findById(id);

    return (
        <main className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>

            {/* Success message (if redirected with ?updated=1) */}
            {typeof window === "undefined" ? null : (
                new URLSearchParams(window.location.search).get("updated") === "1" && (
                    <p className="bg-green-700 p-2 rounded mb-4 text-green-100">
                        Profile updated successfully!
                    </p>
                )
            )}

            <form action="/api/profile/update" method="post" className="space-y-3">
                <input
                    name="name"
                    defaultValue={user.name}
                    className="w-full p-2 bg-slate-900 rounded"
                />

                <textarea
                    name="bio"
                    defaultValue={user.bio}
                    className="w-full p-2 bg-slate-900 rounded"
                />

                <button type="submit" className="px-4 py-2 bg-indigo-600 rounded">
                    Save
                </button>
            </form>

            <a
                href="/home"
                className="inline-block mt-4 text-indigo-400 hover:underline"
            >
                ← Back to Home
            </a>
        </main>
    );
}
