import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";

export default async function MyComments() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return <div className="p-6 text-white">Not logged in</div>;
    }

    const { id: userId } = jwt.verify(token, "SECRET123");

    await connectDB();

    const comments = await Comment.find({ userId })
        .populate("planId", "title")
        .sort({ createdAt: -1 });

    return (
        <main className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-4">Your Comments</h1>

            {comments.length === 0 && <p>No comments yet.</p>}

            {comments.map((c) => (
                <div key={c._id} className="p-4 bg-slate-900 rounded mt-3">
                    <p className="text-gray-300">{c.text}</p>

                    <p className="text-sm text-gray-500 mt-1">
                        On:
                        <a
                            href={`/plan/${c.planId?._id}`}
                            className="text-indigo-400 underline ml-1"
                        >
                            {c.planId?.title}
                        </a>
                    </p>

                    <p className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                    </p>
                </div>
            ))}
        </main>
    );
}
