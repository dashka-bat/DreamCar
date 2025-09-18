"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Requests() {
    const [lottery, setLottery] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const fetchLottery = async () => {
            try {
                const res = await fetch(`/api/getOneLottery/${id}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                setLottery(data);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLottery();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!lottery) return <div>Сугалаа олдсонгүй</div>;

    return (
<div className="hidden md:block w-[70%] mx-auto overflow-x-auto">
  <div className="border border-gray-300 rounded-lg shadow">
    <div className="grid grid-cols-3 bg-gray-100 font-semibold text-gray-700 p-2 border-b border-gray-300">
      <div>Утасны дугаар</div>
      <div>Тоо хэмжээ</div>
      <div>Хугацаа</div>
    </div>

    {lottery.participants?.length > 0 ? (
      <div>
        {lottery.participants.map((r: any) => (
          <div
            key={String(r._id)}
            className="grid grid-cols-3 p-2 border-b border-gray-300 hover:bg-gray-50"
          >
            <div>{r.phoneNumber}</div>
            <div>{r.ticketNumber}</div>
            <div>{r.soldAt ? new Date(r.soldAt).toLocaleString() : "N/A"}</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 p-3">Оролцогч байхгүй</p>
    )}
  </div>
</div>


    );
}
