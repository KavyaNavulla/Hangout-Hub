"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ planId }) {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!text.trim()) {
            setMessage("Comment cannot be empty!");
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("planId", planId);
            formData.append("text", text);

            const res = await fetch("/api/comments", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setText("");
                setMessage("Successfully commented!");
                // Refresh the page to show the new comment
                setTimeout(() => {
                    router.refresh();
                }, 1000);
            } else {
                const data = await res.json();
                setMessage(data.error || "Failed to post comment");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-slate-900 rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                placeholder="Ask a doubt about this plan..."
                required
                disabled={isSubmitting}
            ></textarea>

            <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Posting..." : "Post Comment"}
            </button>

            {message && (
                <div
                    className={`p-3 rounded ${
                        message.includes("Successfully")
                            ? "bg-green-600/30 text-green-300 border border-green-500/50"
                            : "bg-red-600/30 text-red-300 border border-red-500/50"
                    }`}
                >
                    {message}
                </div>
            )}
        </form>
    );
}

