
"use client"
import { useEffect, useState } from "react";
import AddParticipant from "./add-participant";
import { FaRegEdit } from "react-icons/fa";
import { CiCircleChevRight, CiCirclePlus } from "react-icons/ci";

export default function AllInactiveLottery() {
    const [lotteries, setLotteries] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/lottery")
            .then(res => res.json())
            .then(data => setLotteries(data))
            .catch(err => console.error("Error fetching lotteries:", err));
    }, []);


    const filteredLotteries = lotteries.filter(lottery =>
        lottery.id.toLowerCase().includes(search.toLowerCase()) ||
        lottery.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-4 lg:ml-20">
                <input
                    type="text"
                    placeholder="ID эсвэл нэрээр хайх..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            <div>
                {filteredLotteries.length === 0 ? (
                    <p className="text-center">Сугалаа олдсонгүй</p>
                ) : (
                    <div className="grid 2xl:grid-cols-2 xl-grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:ml-20">
                        {filteredLotteries.filter((lottery: { active: boolean }) => lottery.active === false).map((lottery: any) => (
                            <div key={lottery.id} className="lg:w-[600px] relative">
                                <div className="bg-white border border-gray-500 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {lottery.img && lottery.img.length > 0 && (
                                             <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={lottery.img[0]}
                                                alt={lottery.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">

                                        <div className="p-6 space-y-3">
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                {lottery.name} ({lottery.id})
                                            </h2>
                                            <p className="text-gray-500 text-sm">
                                                <span className="font-medium text-gray-700">Үүссэн огноо:</span>{" "}
                                                {new Date(lottery.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                <span className="font-medium text-gray-700">Дуусах огноо :</span>{" "}
                                                {new Date(lottery.endedAt).toLocaleDateString()}
                                            </p>
                                            <div className="flex flex-wrap gap-4 mt-2">
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Үнэ: {lottery.price}₮
                                                </span>
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Нийт хэмжээ: {lottery.totalNumber}
                                                </span>
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Зарагдсан: {lottery.soldNumber || 0}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${lottery.active
                                                        ? "bg-green-200 text-green-900"
                                                        : "bg-red-200 text-red-900"
                                                        }`}
                                                >
                                                    {lottery.active ? "Идэвхитэй" : "Идэвхигүй"}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mt-2">
                                                {lottery.description || "No description provided."}
                                            </p>
                                        </div>
                                        
                                      

                                    </div>
                                 <a href={`/admin/winner/${lottery.id}`}>
                                       <button className="ml-3 mb-3 flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                                        <CiCirclePlus className="text-[30px]" />
                                        Ялагч нэмэх
                                        </button>
                                 </a>
                                  <div className="absolute top-[570px] left-[550px]">
                                                                            <a href={`/admin/participants/${lottery.id}`}><CiCircleChevRight className="w-10 h-10 hover:text-blue-400" /></a>
                                                                             </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
