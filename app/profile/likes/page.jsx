import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export default async function MyLikes() {

    // ⭐ FIX: cookies() must be awaited
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return <p className="text-white p-6">Not logged in</p>;
    }

    const { id } = jwt.verify(token, "SECRET123");

    await connectDB();

    const likedPlans = await Plan.find({ voters: id });

    return (
        <main className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Your Likes</h1>

            {likedPlans.length === 0 && (
                <p className="text-gray-400">You haven't liked any plans yet.</p>
            )}

            {likedPlans.map(p => (
                <div key={p._id} className="p-4 bg-slate-900 rounded mb-4">
                    <h2 className="text-xl font-semibold">{p.title}</h2>
                    <p>❤️ {p.votes} Likes</p>

                    <div className="mt-3 flex gap-3">
                        <a
                            href={`/plan/${p._id}`}
                            className="px-3 py-1 bg-indigo-600 rounded"
                        >
                            View
                        </a>

                        {/* UNLIKE FORM */}
                        <form action={`/api/unlikes/${p._id}`} method="post">
                            <button className="px-3 py-1 bg-red-600 rounded">
                                Unlike
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </main>
    );
}
