"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [logoutMsg, setLogoutMsg] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("loggedOut") === "1") {
            setLogoutMsg("You have been logged out successfully.");
        }
    }, [searchParams]);

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setMsg(data.message || data.error);

        if (res.ok) router.push("/home");
    }

    return (
        <main className="
            min-h-screen flex justify-center items-center 
            bg-gradient-to-br from-teal-600 via-cyan-700 to-indigo-800
            text-white relative overflow-hidden p-6
        ">

            {/* Floating animated circles */}
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-10 -left-20 animate-pulse"></div>
            <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-2xl bottom-14 right-10 animate-ping"></div>

            {/* Glassmorphism Login Card */}
            <div className="
                bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20
                p-10 rounded-3xl w-full max-w-md 
                animate-slideUp transform transition
                hover:shadow-white/20 hover:scale-[1.02]
            ">

                {/* Logout message */}
                {logoutMsg && (
                    <p className="mb-4 bg-green-600/30 text-green-200 text-center py-2 rounded-lg shadow animate-fade">
                        {logoutMsg}
                    </p>
                )}

                {/* Heading */}
                <h2 className="
                    text-4xl font-extrabold text-center mb-6
                    bg-gradient-to-r from-yellow-300 via-white to-cyan-200 
                    bg-clip-text text-transparent drop-shadow-md
                ">
                    Welcome Back ✨
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-200 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="
                                w-full px-4 py-3 rounded-lg
                                bg-white/20 text-white placeholder-gray-200
                                border border-white/30 shadow-inner
                                focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 
                                outline-none transition
                            "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-200 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="
                                w-full px-4 py-3 rounded-lg
                                bg-white/20 text-white placeholder-gray-200
                                border border-white/30 shadow-inner
                                focus:ring-2 focus:ring-pink-300 focus:border-pink-400 
                                outline-none transition
                            "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="
                            w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-400
                            hover:from-indigo-400 hover:to-cyan-300 
                            rounded-xl font-bold text-lg 
                            transition transform hover:scale-[1.05] active:scale-95 
                            shadow-xl shadow-cyan-500/40
                        "
                    >
                        Login
                    </button>

                    {/* Error message */}
                    {msg && (
                        <p className="text-center text-red-300 text-sm animate-fade">
                            {msg}
                        </p>
                    )}

                    {/* Signup link */}
                    <p className="text-center text-gray-200 text-sm mt-1">
                        New here?{" "}
                        <a href="/auth/signup" className="text-yellow-300 hover:text-white transition underline">
                            Create an account
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}
