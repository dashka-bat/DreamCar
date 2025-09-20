"use client";

import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { PiRadioactive } from "react-icons/pi";
import { TbRadioactiveFilled } from "react-icons/tb";
import { IoIosGitPullRequest } from "react-icons/io";
import AllActiveLottery from "./components/all-active-lottery";
import AllInactiveLottery from "./components/all-inactive-lottery";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

import { IoCloudUploadOutline } from "react-icons/io5";
import Requests from "./components/requests";
const correctPin = String(process.env.NEXT_PUBLIC_ADMIN_PIN);
const PIN_TIMEOUT = 10 * 60 * 10000;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    createdAt: "",
    endedAt: "",
    price: "",
    totalNumber: "",
    soldNumber: "",
    active: true,
    description: "",
    img: [] as string[],
    winners: [],
  });
  const [pin, setPin] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem("pinVerifiedAt");
    if (savedTime) {
      const elapsed = Date.now() - Number(savedTime);
      if (elapsed < PIN_TIMEOUT) {
        setIsAuthorized(true);
        setTimeLeft(Math.ceil((PIN_TIMEOUT - elapsed) / 1000));
      } else {
        localStorage.removeItem("pinVerifiedAt");
      }
    }
  }, []);
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthorized(true);
      setTimeLeft(10 * 60);
      localStorage.setItem("pinVerifiedAt", Date.now().toString());
      setPin("");
    } else {
      alert("PIN буруу байна");
    }
  };
  useEffect(() => {
    if (!isAuthorized) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsAuthorized(false);
          localStorage.removeItem("pinVerifiedAt");
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthorized]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="4 оронтой PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="p-2 border rounded text-center"
            maxLength={4}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "file") {
      handleUpload(target);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

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
        setFormData((prev) => ({
          ...prev,
          img: [...prev.img, dataJson.secure_url],
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        totalNumber: Number(formData.totalNumber),
        soldNumber: Number(formData.soldNumber || 0),
        createdAt: new Date(formData.createdAt).toISOString(),
        endedAt: new Date(formData.endedAt).toISOString(),
        active: Boolean(formData.active),
      };

      const response = await fetch("/api/lottery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error:", errorData);
        throw new Error("Failed to create lottery");
      }

      const result = await response.json();
      console.log("Lottery created:", result);
      alert("Сугалаа амжилттай хадгалагдлаа!");
      setFormData({
        name: "",
        createdAt: "",
        endedAt: "",
        price: "",
        totalNumber: "",
        soldNumber: "",
        active: true,
        description: "",
        img: [],
        winners: [],
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Сугалааг хадгалах үед алдаа гарлаа.");
    }
  };

  return (
    <div className="flex relative">
      <div className="fixed top-0 left-0 w-[100%] max-w-xs bg-white p-8 h-screen shadow z-40 pt-[120px]">
        <div className="flex flex-col justify-between h-full">
          <nav className="flex flex-col gap-6 text-sm text-gray-700">
            <button
              onClick={() => setActiveTab("add")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "add" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <CiCirclePlus className="w-7 h-7" /> Сугалаа оруулах
            </button>

            <button
              onClick={() => setActiveTab("active")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "active" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <PiRadioactive className="w-7 h-7 text-gray-400" /> Идэвхитэй
              сугалаа
            </button>

            <button
              onClick={() => setActiveTab("inactive")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "inactive" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <TbRadioactiveFilled className="w-7 h-7" /> Идэвхигүй сугалаа
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "requests" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <IoIosGitPullRequest className="w-7 h-7" /> Хүсэлтүүд
            </button>
            <div className=" absolute bottom-5 font-semibold">
              Улирал дуусахад: {formatTime(timeLeft)}
            </div>
          </nav>
        </div>
      </div>

      <div className="ml-[260px] p-10 w-full">
        {activeTab === "add" && (
          <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow space-y-8"
          >
            <h2 className="text-3xl font-bold mb-6">Сугалаа нэмэх</h2>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Нэр
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block border-1  h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Эхлэх огноо
                </label>
                <input
                  type="date"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10   border-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Дуусах огноо
                </label>
                <input
                  type="date"
                  name="endedAt"
                  value={formData.endedAt}
                  onChange={handleChange}
                  className="mt-1 block h-10   border-1 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Үнэ
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block h-10   border-1 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Нийт тоо
                </label>
                <input
                  type="number"
                  name="totalNumber"
                  value={formData.totalNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 h-10   border-1 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Тайлбар
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 h-[500px]  border-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <div className=" grid grid-cols-3  lg:gap-2 relative">
                {formData.img.map((url, i) => (
                  <div key={i} className="relative xl:w-75 lg:w-50 w-80 h-50">
                    <img
                      src={url}
                      alt="Uploaded"
                      className="w-full h-full object-fill rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          img: prev.img.filter((_, index) => index !== i),
                        }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                ))}
                <label className="lg:w-50 xl:w-75 w-80 h-50 bg-gray-300 text-gray-700 cursor-pointer rounded flex items-center justify-center hover:bg-gray-400">
                  <IoCloudUploadOutline className="w-10 h-10" />
                  <input
                    type="file"
                    multiple
                    name="img"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
              >
                Хадгалах
              </button>
            </div>
          </form>
        )}

        {activeTab === "active" && (
          <div className="flex justify-center items-center">
            <AllActiveLottery />
          </div>
        )}

        {activeTab === "inactive" && (
          <div className="flex justify-center items-center">
            <AllInactiveLottery />
          </div>
        )}
        {activeTab === "requests" && (
          <div className="flex justify-center items-center">
            <Requests />
          </div>
        )}
      </div>
    </div>
  );
}
