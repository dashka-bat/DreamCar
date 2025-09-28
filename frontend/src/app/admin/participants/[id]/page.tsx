"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Requests() {
  const [lottery, setLottery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const lotteryId = Array.isArray(id) ? id[0] : id;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!lotteryId) return;

    const fetchLottery = async () => {
      try {
        const res = await fetch(`/api/getOneLottery/${lotteryId}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setLottery(data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLottery();
  }, [lotteryId]);

  const handleDelete = async ({ lotteryId, ticketNumber }: any) => {
    try {
      const res = await fetch(
        `/api/lottery/${lotteryId}/participant/${ticketNumber}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Оролцогч устлаа");
        setLottery((prev: any) => ({
          ...prev,
          participants: prev.participants.filter(
            (p: any) => p.ticketNumber !== ticketNumber
          ),
        }));
      } else {
        setMessage("❌ Алдаа: " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Сүлжээний алдаа гарлаа");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!lottery) return <div>Сугалаа олдсонгүй</div>;

  return (
    <div className="hidden md:block w-[70%] mx-auto overflow-x-auto">
      <div className="border border-gray-300 rounded-lg shadow">
        <div className="grid grid-cols-4 bg-gray-100 font-semibold text-gray-700 p-2 border-b border-gray-300">
          <div>Утасны дугаар</div>
          <div>Тасалбар</div>
          <div>Хугацаа</div>
          <div></div>
        </div>

        {lottery.participants?.length > 0 ? (
          <div>
            {lottery.participants.map((r: any) => (
              <div
                key={String(r._id)}
                className="grid grid-cols-4 p-2 border-b border-gray-300 hover:bg-gray-50"
              >
                <div>{r.phoneNumber}</div>
                <div>{r.ticketNumber}</div>
                <div>{r.soldAt ? new Date(r.soldAt).toLocaleString() : "N/A"}</div>
                <button
                  onClick={() =>
                    handleDelete({ lotteryId, ticketNumber: r.ticketNumber })
                  }
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Устгах
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 p-3">Оролцогч байхгүй</p>
        )}
      </div>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
