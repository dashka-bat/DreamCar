"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Lottery {
  id: string;
  name: string;
  description?: string;
  img?: string[];
  createdAt: string;
  endedAt: string;
  price: number;
  totalNumber: number;
  soldNumber?: number;
  active: boolean;
}

export default function LotteryDetailPage() {
  const { id } = useParams();
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
      const router = useRouter();
  const handleUpload = async (input: HTMLInputElement) => {
    try {
      if (input.files && input.files.length > 0) {
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
        setLottery(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            img: [...(prev.img ?? []), dataJson.secure_url],
          };
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Зургийг байршуулж чадсангүй. Дахин оролдоно уу.");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchLottery = async () => {
      try {
        const res = await fetch(`/api/getOneLottery/${id}`);
        if (!res.ok) throw new Error("Failed to fetch lottery");
        const data = await res.json();
        setLottery(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLottery();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!lottery) return;
    const { name, type, value } = e.target;
    setLottery({
      ...lottery,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSave = async () => {
    if (!lottery) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/getOneLottery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lottery),
      });
      if (!res.ok) throw new Error("Failed to update lottery");
      const updated = await res.json();
      setLottery(updated);
      if (window.confirm("Lottery шинэчлэгдлээ ✅")) {
      router.push("/admin");
    }
    } catch (error) {
      console.error(error);
      alert("Өөрчлөлтүүдийг хадгалж чадсангүй");
    } finally {
      setSaving(false);
    }
  };


const handleDelete = async ({ id }: { id: string }) => {
  

  try {
    const res = await fetch(`/api/getOneLottery/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
     
      console.error("Failed to delete lottery:");
      return;
    }

    const data = await res.json();
    console.log("Lottery deleted:", data);
    if (window.confirm("Lottery устгагдлаа ✅")) {
      router.push("/admin");
    }

  } catch (error) {
    console.error("Error deleting lottery:", error);
  }
};

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!lottery) return <p className="text-center py-10">Lottery not found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Сугалааг засварлах</h1>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Нэр</label>
          <input
            type="text"
            name="name"
            value={lottery.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        
        <div>
          <label className="block font-medium mb-1">Тайлбар</label>
          <textarea
            name="description"
            value={lottery.description || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">Зурагнууд</label>
          <input
            type="file"
            name="img"
            onChange={(e) => handleUpload(e.target)}
            className="w-full border rounded p-2 mb-2"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {lottery.img?.map((url, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 md:h-48 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setLottery(prev => prev ? { ...prev, img: prev.img?.filter((_, i) => i !== idx) } : prev)
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Үүсгэсэн хугацаа</label>
            <input
              type="date"
              name="createdAt"
              value={lottery.createdAt.split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Дууцах хугацаа</label>
            <input
              type="date"
              name="endedAt"
              value={lottery.endedAt.split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Үнэ</label>
            <input
              type="number"
              name="price"
              value={lottery.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Нийт тоо</label>
            <input
              type="number"
              name="totalNumber"
              value={lottery.totalNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={lottery.active}
            onChange={handleChange}
            className="mr-2"
          />
          <span>{lottery.active ? "Идэвхитэй" : "Идэвхигүй"}</span>
        </div>
        <div className="flex justify-between">
          <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saving ? "Хадгалж байна..." : "Хадгалах"}
        </button>
         <button
          onClick={() => handleDelete({ id: lottery.id })}
       
          className={`px-4 py-2  rounded text-white ${saving ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
        >
          {saving ? "Устгаж байна..." : "Устгах"}
        </button>
        </div>
      </div>
    </div>
  );
}
