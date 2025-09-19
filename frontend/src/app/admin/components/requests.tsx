"use client";
import { useEffect, useState } from "react";
import { IRequest } from "@/model/request";

export default function Requests() {
    const [requests, setRequests] = useState<IRequest[]>([]);
    const [lottery, setLottery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lotteryRes, requestsRes] = await Promise.all([
                    fetch("/api/lottery"),
                    fetch("/api/request")
                ]);
                if (!lotteryRes.ok || !requestsRes.ok) throw new Error("Failed to fetch data");
                const lotteryData = await lotteryRes.json();
                const requestsData = await requestsRes.json();
                setLottery(lotteryData);
                setRequests(requestsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/request");
                if (!res.ok) throw new Error("Failed to fetch requests");
                const data = await res.json();
                setRequests(data);
            } catch (err) {
                console.error(err);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const updateStatus = async (r: IRequest, status: "APPROVED" | "DECLINED") => {
        try {
            const res = await fetch("/api/request", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: r._id,
                    categoryId: r.categoryId,
                    phoneNumber: r.phoneNumber,
                    quantity: r.quantity,
                    status
                })
            });

            if (!res.ok) throw new Error("Failed to update status");

            const data = await res.json();
            console.log("PATCH response:", data);
            setRequests((prev) => prev.filter((req) => req._id !== r._id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 w-full space-y-6">
            {lottery.map((l: any) => {
                const relatedRequests = requests.filter((r: IRequest) => r.categoryId === l.id);
                if (relatedRequests.length === 0) return null;

                return (
                    <div key={l.id} className="border w-full rounded-lg shadow p-4">
                        <h2 className="text-black font-bold text-2xl mb-4">{l.name}</h2>

                        <div className="overflow-x-auto">
                            <div className="border border-gray-300 rounded-lg">
                                <div className="grid grid-cols-6 bg-gray-100 font-semibold text-gray-700 p-2 border-b border-gray-300">
                                    <div>Утасны дугаар</div>
                                    <div>Тоо хэмжээ</div>
                                    <div>Төлөв</div>
                                    <div>Хугацаа</div>
                                    <div className="xl:ml-20 lg:ml-16">Баталгаажуулах</div>
                                </div>

                                {relatedRequests.map((r: IRequest) => (
                                    <div key={String(r._id)} className="grid grid-cols-6 p-2 border-b border-gray-300 hover:bg-gray-50">
                                        <div>{r.phoneNumber}</div>
                                        <div>{r.quantity}</div>
                                        <div>{r.status}</div>
                                        <div>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A"}</div>
                                        <div className="2xl:flex xl:flex gap-4 xl:ml-20 lg:ml-16">
                                            <button
                                                className="text-green-500 cursor-pointer"
                                                onClick={() => updateStatus(r, "APPROVED")}
                                            >
                                                Зөвшөөрөх
                                            </button>
                                            <button
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => updateStatus(r, "DECLINED")}
                                            >
                                                Татгалзах
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
