"use client";
import { useEffect, useState } from "react";

export function Section2() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/lottery")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="w-full flex jutsify-center items-center flex-col mt-15">
      <h1 className="self-start text-2xl font-bold  text-[#b19155]">
        Одоогийн Сугалаа
      </h1>
      {data.map((item: any) => (
        <div
          key={item.id}
          className="bg-black rounded-lg w-[354px] h-[306px] mt-5 border-[0.5px] border-[#2E3A4B] p-4"
        >
          <div className="flex justify-between">
            <h3 className="text-[#4ADE80]">
              {item.active ? "Идэвхтэй" : "Идэвхгүй"}
            </h3>
            <h4 className="text-[#b19155]">{item.endedAt}</h4>
          </div>
          <h2 className="text-xl font-bold mt-4 text-[#b19155]">
            {item.name}{" "}
          </h2>
          <h3 className="text-[#b19155]">{item.description}</h3>
          <div className="flex justify-between mt-5 px-4">
            {" "}
            <div className="flex flex-col justify-center items-center">
              {" "}
              <h2 className="text-3xl font-bold text-[#b19155]">
                {item.price}₮
              </h2>
              <h3 className="text-[#b19155]">Тасалбарын үнэ</h3>{" "}
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-[#b19155]">
                {item.soldNumber}
              </h2>
              <h3 className="text-[#b19155]">Зарагдсан</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            {" "}
            <h3 className="text-[#b19155] self-center flex">
              {(item.soldNumber * 100) / item.totalNumber}% зарагдсан (
              {item.totalNumber}-аас)
            </h3>
          </div>
          <button className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
            Тасалбар худалдаж авах
          </button>
        </div>
      ))}
    </div>
  );
}
