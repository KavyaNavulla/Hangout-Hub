"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-slate-900 text-white p-4 flex justify-between items-center border-b border-slate-700">

            <Link href="/home" className="text-xl font-bold">
                HangoutHub
            </Link>

            <div className="relative group">
                <button className="px-4 py-2 bg-slate-800 rounded">
                    Profile ▾
                </button>

                <div className="absolute right-0 bg-slate-900 border border-slate-700 rounded p-2 hidden group-hover:block w-48">
                    <a href="/profile" className="block p-2 hover:bg-slate-800">Edit Profile</a>
                    <a href="/profile/posts" className="block p-2 hover:bg-slate-800">Your Posts</a>
                    <a href="/profile/comments" className="block p-2 hover:bg-slate-800">Your Comments</a>
                    <a href="/profile/likes" className="block p-2 hover:bg-slate-800">Your Likes</a>
                    <a href="/api/logout" className="block p-2 hover:bg-red-700 mt-2">Logout</a>
                </div>
            </div>

        </nav>
    );
}
