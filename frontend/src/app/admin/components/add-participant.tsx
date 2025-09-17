"use client";
import { useState } from "react";

export default function AddParticipant({id}: {id?: string}) {
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");

  const isValid =
    phone.length == 8 && quantity.length > 0 && Number(quantity) > 0;

  const handleAdd = () => {
    console.log("Phone:", phone, "Quantity:", quantity);
    fetch(`/api/participants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lotteryId: id,
        phoneNumber: phone,
        quantity: Number(quantity),
        }),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to add participants");
      return res.json();
    }).then((data) => {
      console.log("Participants added:", data);
      alert(`Successfully added ${data.participants.length} participants.`);
      setPhone("");
      setQuantity("");
    }).catch((err) => {
      console.error("Error adding participants:", err);
      alert("Failed to add participants. Please try again.");
    }
    )
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        placeholder="Утасны дугаар"
        className="border rounded p-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="number"
        placeholder="Сугалааны тоо"
        className="border rounded p-2"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        className={`px-4 py-2 rounded text-white transition-colors ${
          isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isValid}
        onClick={handleAdd}
      >
        Нэмэх
      </button>
    </div>
  );
}

