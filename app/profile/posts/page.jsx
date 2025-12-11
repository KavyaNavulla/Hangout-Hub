import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export default async function MyPosts() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return <div className="p-6 text-white">Not logged in</div>;
    }

    const { id: userId } = jwt.verify(token, "SECRET123");

    await connectDB();

    const plans = await Plan.find({ creatorId: userId }).sort({ createdAt: -1 });

    return (
        <main className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-4">Your Posts</h1>

            {plans.length === 0 && <p>No plans created yet.</p>}

            {plans.map((p) => (
                <div key={p._id} className="p-4 bg-slate-900 rounded mt-3">
                    <h2 className="text-xl font-semibold">{p.title}</h2>
                    <p className="text-gray-400">{p.description}</p>

                    <a
                        href={`/plan/${p._id}`}
                        className="text-indigo-400 underline text-sm"
                    >
                        View Plan →
                    </a>
                </div>
            ))}
        </main>
    );
}
