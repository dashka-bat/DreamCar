"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Winner {
name: string;
ticketNumber: string;
description: string;
img?: string[];
URL?: string;
}

export default function WinnerPlus() {
    const { id } = useParams();
    const [lotteryId, setLotteryId] = useState(id || "");
    const [winner, setWinner] = useState<Winner>({
        name: "",
        ticketNumber: "",
        description: "",
        img: [],
        URL: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWinner(prev => ({ ...prev, [name]: value }));
    };
    const handleUpload = async (input: HTMLInputElement) => {
        try {
            if (input.files && input.files.length > 0) {
                setUploading(true);
                const file = input.files[0];
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "Food_delivery");
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/df88yvhqr/upload`,
                    { method: "POST", body: data }
                );
                if (!response.ok) throw new Error("Image upload failed");
                const dataJson = await response.json();
                setWinner(prev => ({
                    ...prev,
                    img: prev.img ? [...prev.img, dataJson.secure_url] : [dataJson.secure_url],
                }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch("/api/winner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lotteryId, winner }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add winner");
            }
            const data = await response.json();
            setSuccess("Winner added successfully!");
            setWinner({
                name: "",
                ticketNumber: "",
                description: "",
                img: [],
                URL: ""
            });
        } catch (error: any) {
            console.error("Error adding winner:", error);
            setError(error.message || "Failed to add winner");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ялагч нэмэх</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Сугалааны ID</label>
                <input
                    type="text"
                    name="lotteryId"
                    value={lotteryId}
                    onChange={e => setLotteryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Нэр</label>
                <input
                    type="text"
                    name="name" 
                    value={winner.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Сугалааны дугаар</label>
                <input
                    type="text"
                    name="ticketNumber"
                    value={winner.ticketNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4">  
                <label className="block text-gray-700 mb-2">Тайлбар</label>
                <textarea
                    name="description"
                    value={winner.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Зураг</label>
                <input
                    type="file"
                    name="img"
                    onChange={(e) => handleUpload(e.target)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {uploading && <p className="text-blue-500 mt-2">Uploading image...</p>}
                {winner.img && winner.img.length > 0 && (
                    <div className="mt-2">
                        {winner.img.map((url, idx) => (
                            <img key={idx} src={url} alt={`Winner Image ${idx + 1}`} className="w-32 h-32 object-cover mr-2 inline-block" />
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">URL</label>
                <input
                    type="text"
                    name="URL"
                    value={winner.URL}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            >
                {loading ? "Adding Winner..." : "Add Winner"}
            </button>
        </div>
    );
}