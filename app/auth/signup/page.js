"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        setMsg(data.message || data.error);

        if (res.ok) {
            // clear fields
            setName("");
            setEmail("");
            setPassword("");
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-6 rounded-xl w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input
                    placeholder="Name"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    type="email"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold"
                >
                    Register
                </button>

                {msg && (
                    <div className="text-center mt-2">
                        <p className="text-green-400 mb-2">{msg}</p>

                        {msg === "User registered" && (
                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="underline text-indigo-400"
                            >
                                Login Now
                            </button>
                        )}
                    </div>
                )}
            </form>
        </main>
    );
}
