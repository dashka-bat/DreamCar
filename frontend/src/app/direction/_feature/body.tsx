"use client";
import { FaTrophy } from "react-icons/fa";

export function Body() {
  const steps = [
    "Идэвхтэй суглааны сугалаа худалдаж авах товч дээр дарна",
    "Өөрийн ашигладаг дугаараа оруулна",
    "Хэдэн ширхэг суглаа авахаа сонгоно",
    "Бидний өгсөн зааврын дагуу гүйлгээний утга болон мөнгөн дүнгээ оруулна",
    "Дансруу явуулсанаас хойш 2-8 цагийн дотор баталгаажина",
  ];

  return (
    <div>
      {/* Header */}
      <div className="w-[375px] h-fit flex justify-center bg-black">
        <div className="bg-black w-[375px] h-20">
          <div className="flex flex-col items-center justify-center mt-2">
            <FaTrophy className="w-[70px] h-[70px] text-[#b19155]" />
          </div>
          <div className="text-center text-4xl text-[#b19155]">
            Сугалааны Заавар
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 mt-15 mb-5">
        {steps.map((text, index) => (
          <div
            key={index}
            className="bg-black w-[300px] border-2 border-[#b19155] rounded-lg m-auto p-4 text-center"
          >
            {/* Step number */}
            <div className="text-[#b19155] font-bold text-2xl mb-2">
              {index + 1}-р алхам
            </div>
            {/* Step text */}
            <p className="text-[#b19155] text-lg leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
