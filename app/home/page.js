"use client";

import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
    const [plans, setPlans] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [search, setSearch] = useState("");
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        async function loadPlans() {
            const res = await fetch("/api/plans/list");
            const data = await res.json();

            setPlans(data);
            setFiltered(data);
        }
        loadPlans();
    }, []);

    // APPLY FILTERS
    useEffect(() => {
        let list = [...plans];

        // 🔍 Search Filter
        if (search.trim()) {
            const s = search.toLowerCase();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(s) ||
                    p.description?.toLowerCase().includes(s) ||
                    p.timeline?.some((t) =>
                        t.location?.toLowerCase().includes(s)
                    )
            );
        }

        // 💰 Manual Budget Filter
        if (minBudget !== "") {
            list = list.filter((p) => p.budget >= Number(minBudget));
        }

        if (maxBudget !== "") {
            list = list.filter((p) => p.budget <= Number(maxBudget));
        }

        // 🔽 Sorting
        if (sort === "likes") list.sort((a, b) => b.votes - a.votes);
        if (sort === "budgetHigh") list.sort((a, b) => b.budget - a.budget);
        if (sort === "budgetLow") list.sort((a, b) => a.budget - b.budget);
        if (sort === "recent")
            list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFiltered(list);
    }, [search, minBudget, maxBudget, sort, plans]);


    return (
        <main className="min-h-screen bg-slate-950 text-white p-6 animate-fade">
            <Navbar />

            <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                Explore Hangout Plans
            </h1>

            {/* 🔎 SEARCH & FILTER BAR */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by title, location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
                />

                {/* Min Budget */}
                <input
                    type="number"
                    placeholder="Min Budget (₹)"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
                />

                {/* Max Budget */}
                <input
                    type="number"
                    placeholder="Max Budget (₹)"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
                />

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
                >
                    <option value="">Sort By</option>
                    <option value="likes">Most Liked</option>
                    <option value="budgetHigh">Budget: High → Low</option>
                    <option value="budgetLow">Budget: Low → High</option>
                    <option value="recent">Recently Added</option>
                </select>
            </div>
            {/* Create Plan Button */}
            <div className="mt-10 flex justify-center">
                <Link
                    href="/create"
                    className="
                        flex items-center gap-2 px-6 py-3
                        bg-gradient-to-r from-indigo-600 to-cyan-500
                        hover:from-indigo-500 hover:to-cyan-400
                        rounded-xl font-bold text-lg
                        transition transform hover:scale-105 active:scale-95
                        shadow-xl shadow-indigo-500/40
                    "
                >
                    <span className="text-2xl">+</span>
                    <span>Create Plan</span>

                </Link>

            </div>
            <br></br>
            {/* PLANS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((p) => (
                    <div
                        key={p._id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/20 transition hover:-translate-y-1 animate-slideUp"
                    >
                        {p.images?.length > 0 && (
                            <img
                                src={p.images[0]}
                                className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                            />
                        )}

                        <h2 className="text-2xl font-bold text-indigo-300">
                            {p.title}
                        </h2>

                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {p.description?.slice(0, 120)}...
                        </p>

                        <div className="flex justify-between text-sm mt-3">
                            <span className="text-indigo-400 font-semibold">
                                ₹{p.budget}
                            </span>
                            <span className="text-gray-400">
                                ❤️ {p.votes}
                            </span>
                        </div>

                        <Link
                            href={`/plan/${p._id}`}
                            className="mt-4 inline-block w-full text-center bg-indigo-600 hover:bg-indigo-500 py-2 rounded-xl font-semibold transition"
                        >
                            View Full Plan
                        </Link>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    No matching plans found.
                </p>
            )}


        </main>
    );
}
