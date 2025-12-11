"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReplyForm({ commentId }) {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!text.trim()) {
            setMessage("Reply cannot be empty!");
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("text", text);

            const res = await fetch(`/api/comments/${commentId}/reply`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setText("");
                setMessage("Successfully replied!");
                // Refresh the page to show the new reply
                setTimeout(() => {
                    router.refresh();
                }, 1000);
            } else {
                const data = await res.json();
                setMessage(data.error || "Failed to post reply");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <textarea
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 bg-slate-800 rounded border border-slate-700 focus:border-green-500 focus:outline-none"
                placeholder="Reply as creator..."
                required
                disabled={isSubmitting}
            ></textarea>

            <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded mt-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Replying..." : "Reply"}
            </button>

            {message && (
                <div
                    className={`mt-2 p-2 rounded text-sm ${
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

