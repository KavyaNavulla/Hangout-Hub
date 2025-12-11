"use client";

import { useState } from "react";

export default function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-slate-800"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img}
                            alt={`Plan image ${index + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition"
                        >
                            ✕ Close
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

