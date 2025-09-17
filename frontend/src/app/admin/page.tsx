"use client"

import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { PiRadioactive } from "react-icons/pi"
import { TbRadioactiveFilled } from "react-icons/tb"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add")

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 w-[100%] max-w-xs bg-white p-8 h-screen shadow z-40 pt-[120px]">
        <div className="flex flex-col justify-between h-full">
          <nav className="flex flex-col gap-6 text-sm text-gray-700">
            <button
              onClick={() => setActiveTab("add")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "add" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <CiCirclePlus className="w-7 h-7" />
              Сугалаа оруулах
            </button>

            <button
              onClick={() => setActiveTab("active")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "active" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <PiRadioactive className="w-7 h-7 text-gray-400" />
              Идэвхитэй сугалаа
            </button>

            <button
              onClick={() => setActiveTab("inactive")}
              className={`flex text-xl items-center gap-2 transition-all px-4 py-4 rounded-lg ${
                activeTab === "inactive" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <TbRadioactiveFilled className="w-7 h-7" />
              Идэвхигүй сугалаа
            </button>
          </nav>
        </div>
      </div>
      <div className="ml-[260px] p-10 w-full">
        {activeTab === "add" && (
          <div>
            <h1 className="text-2xl font-bold">Сугалаа нэмэх</h1>
            <p>Энд form эсвэл input байршина.</p>
          </div>
        )}

        {activeTab === "active" && (
          <div>
            <h1 className="text-2xl font-bold">Идэвхитэй сугалаанууд</h1>
            <p>Идэвхтэй байгаа бүх сугалааны жагсаалт.</p>
          </div>
        )}

        {activeTab === "inactive" && (
          <div>
            <h1 className="text-2xl font-bold">Идэвхигүй сугалаанууд</h1>
            <p>Энд идэвхигүй сугалаанууд харагдана.</p>
          </div>
        )}
      </div>
    </div>
  )
}

