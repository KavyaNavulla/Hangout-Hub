import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import Comment from "@/models/Comment";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import ImageGallery from "@/components/ImageGallery";
import CommentForm from "@/components/CommentForm";
import ReplyForm from "@/components/ReplyForm";


export default async function ViewPlanPage({ params }) {
    // unwrap params
    const { id } = await params;

    await connectDB();

    // -------------------------------
    // 🔐 CURRENT LOGGED-IN USER
    // -------------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let currentUserId = null;
    if (token) {
        try {
            currentUserId = jwt.verify(token, "SECRET123").id;
        } catch (e) {
            currentUserId = null;
        }
    }

    // -------------------------------
    // 📌 LOAD PLAN
    // -------------------------------
    const plan = await Plan.findById(id).populate("creatorId", "name");

    if (!plan) {
        return (
            <main className="p-6 text-white">
                <h1 className="text-2xl">Plan not found</h1>
            </main>
        );
    }

    const liked = plan.voters.some(v => v.toString() === currentUserId);

    // -------------------------------
    // 💬 LOAD COMMENTS + REPLIES
    // -------------------------------
    const comments = await Comment.find({ planId: id })
        .populate("userId", "name")
        .sort({ createdAt: -1 });

    return (
        <main className="min-h-screen bg-slate-950 text-white p-6">

            {/* TITLE + DESCRIPTION */}
            <h1 className="text-3xl font-bold mb-3">{plan.title}</h1>
            <p className="text-gray-300 mb-4">{plan.description}</p>

            <p><b>Budget:</b> ₹{plan.budget}</p>

            {/* IMAGE GALLERY */}
            <ImageGallery images={plan.images} />

            {/* TIMELINE */}
            <h2 className="text-2xl font-semibold mt-6">Timeline</h2>

            {plan.timeline.map((step, i) => (
                <div key={i} className="p-4 bg-slate-900 rounded mt-3">
                    <p><b>{step.startTime} → {step.endTime}</b></p>
                    <p>{step.activity}</p>
                    <p className="text-sm text-gray-400">📍 {step.location}</p>
                </div>
            ))}

            {/* LIKES SECTION */}
            <div className="mt-6 mb-6 p-4 bg-slate-900 rounded flex items-center gap-4">
                <span className="text-lg font-semibold">
                    ❤️ {plan.votes} Likes
                </span>

                {!liked ? (
                    <form action={`/api/likes/${plan._id}`} method="post">
                        <button className="px-4 py-2 bg-green-600 rounded">
                            Like 👍
                        </button>
                    </form>
                ) : (
                    <form action={`/api/unlikes/${plan._id}`} method="post">
                        <button className="px-4 py-2 bg-red-600 rounded">
                            Unlike 👎
                        </button>
                    </form>
                )}
            </div>

            {/* COMMENT BOX */}
            <h2 className="text-2xl font-semibold mt-10 mb-3">Doubts / Questions</h2>

            <CommentForm planId={id} />

            {/* COMMENTS + REPLIES */}
            <div className="mt-6 space-y-4">
                {comments.map((c) => (
                    <div key={c._id} className="p-4 bg-slate-900 rounded">

                        {/* Main Comment */}
                        <p className="text-indigo-400 font-semibold">
                            {c.userId?.name}
                        </p>
                        <p>{c.text}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(c.createdAt).toLocaleString()}
                        </p>

                        {/* Replies */}
                        {c.replies?.map((r) => (
                            <div key={r._id} className="ml-4 mt-2 p-2 bg-slate-800 rounded">
                                <p className="text-green-400 font-semibold">Creator Reply</p>
                                <p>{r.text}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(r.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}

                        {/* Reply Form — only creator */}
                        {plan.creatorId?._id.toString() === currentUserId && (
                            <ReplyForm commentId={c._id.toString()} />
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
