"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePlanPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState([
        { startTime: "", endTime: "", activity: "", location: "" },
    ]);
    const [images, setImages] = useState([]);


    function addTimelineStep() {
        setTimeline([
            ...timeline,
            { startTime: "", endTime: "", activity: "", location: "" },
        ]);
    }

    function handleTimelineChange(i, field, value) {
        const copy = [...timeline];
        copy[i][field] = value;
        setTimeline(copy);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/plans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, budget, timeline, images }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push("/home");
        }
    }
    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.url) {
            setImages([...images, data.url]);
        }
    }


    return (
        <main className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create Hangout Plan</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        placeholder="Plan Title"
                        className="w-full p-3 rounded bg-slate-800"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full p-3 rounded bg-slate-800"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Budget"
                        type="number"
                        className="w-full p-3 rounded bg-slate-800"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <h2 className="text-xl font-semibold">Images</h2>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full p-2 bg-slate-800 rounded"
                    />

                    <div className="flex gap-3 mt-3 flex-wrap">
                        {images.map((img, i) => (
                            <img key={i} src={img} className="w-20 h-20 object-cover rounded border border-slate-700" />
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold">Timeline</h2>
                    {timeline.map((step, index) => (
                        <div key={index} className="p-4 bg-slate-900 rounded space-y-2">
                            <input
                                placeholder="Start Time"
                                className="w-full p-2 rounded bg-slate-800"
                                value={step.startTime}
                                onChange={(e) => handleTimelineChange(index, "startTime", e.target.value)}
                            />
                            <input
                                placeholder="End Time"
                                className="w-full p-2 rounded bg-slate-800"
                                value={step.endTime}
                                onChange={(e) => handleTimelineChange(index, "endTime", e.target.value)}
                            />
                            <input
                                placeholder="Activity"
                                className="w-full p-2 rounded bg-slate-800"
                                value={step.activity}
                                onChange={(e) => handleTimelineChange(index, "activity", e.target.value)}
                            />
                            <input
                                placeholder="Location"
                                className="w-full p-2 rounded bg-slate-800"
                                value={step.location}
                                onChange={(e) => handleTimelineChange(index, "location", e.target.value)}
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addTimelineStep}
                        className="px-4 py-2 bg-gray-700 rounded"
                    >
                        + Add Step
                    </button>

                    <button type="submit" className="w-full py-3 bg-indigo-600 rounded font-bold">
                        Save Plan
                    </button>
                </form>
            </div>
        </main>
    );
}
