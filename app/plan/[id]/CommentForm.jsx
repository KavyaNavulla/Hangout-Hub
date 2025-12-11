"use client";
import { useState } from "react";

export default function CommentForm({ planId }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    async function submitComment(e) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId, text }),
        });

        setLoading(false);

        if (res.ok) {
            setText("");
            location.reload(); // refresh comments
        }
    }

    return (
        <form onSubmit={submitComment} className="space-y-3">
            <textarea
                className="w-full p-3 bg-slate-900 rounded"
                placeholder="Ask a doubt..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded font-bold"
                disabled={loading}
            >
                {loading ? "Posting..." : "Post Comment"}
            </button>
        </form>
    );
}
