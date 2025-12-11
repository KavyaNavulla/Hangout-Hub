"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setMsg(data.message || data.error);

        if (res.ok) {
            router.push("/home");
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-6 rounded-xl w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

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
                    Login
                </button>

                {msg && <p className="text-center text-sm mt-2">{msg}</p>}

                <p className="text-center text-sm mt-2">
                    Not a user?{" "}
                    <a href="/auth/signup" className="text-indigo-400 underline">
                        Register
                    </a>
                </p>
            </form>
        </main>
    );
}
