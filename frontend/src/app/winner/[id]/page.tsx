"use client";

import { Header } from "@/app/components/header";
import { FaInstagram } from "react-icons/fa";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function Winner() {
    const [winner, setWinner] = useState<any>(null);
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchWinner = async () => {
            try {
                const res = await fetch(`/api/getOneLottery/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch winner");
                }
                const data = await res.json();
                const winnerImgs = data?.winners?.[0]?.img || [];
                setWinner({ ...data, winnerImgs });

                if (winnerImgs.length > 0) {
                    setSelectedImage(winnerImgs[0]);
                }
            } catch (err) {
                console.error("Error fetching winner:", err);
            }
        };

        fetchWinner();
    }, []);

    if (!winner) {
        return (
            <div className="bg-black w-full h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex justify-center bg-black">
           <div className="w-[375px]">
             <Header />
            <div className="bg-black  min-h-screen">
                <div className="bg-black w-full  flex flex-col items-center pt-10">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            className="w-[90%] max-w-2xl border-[#2E3A4B] border rounded-md cursor-pointer"
                            alt="Selected"
                        />
                    )}

                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                        {winner?.winnerImgs?.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={`border rounded-md overflow-hidden ${selectedImage === img ? "ring-2 ring-blue-500" : ""
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    className="object-cover w-20 h-20"
                                />
                            </button>
                        ))}
                    </div>

                </div>
                <div className="mt-5 w-[90%] border-b-[#b19155] border-b-1 ml-4">
                    <h1 className="text-[#b19155] font-extrabold text-xl ml-3 pb-3 ">{winner?.winners[0]?.name}</h1>
                </div>
                <div className="ml-4 mt-3">
                    <h1 className="text-[#b19155] font-extrabold text-[16px] ml-5 pb-3">Азтан болсон сугалааны дугаар: {winner.winners[0].ticketNumber}</h1>
                </div>
                <div className="ml-4 mt-3">
                    <h1 className="text-[#b19155] font-extrabold text-[16px] ml-5 pb-3">Утасны дугаар: {winner.winners[0].phoneNumber}</h1>
                </div>
                <div className="mt-5 w-[90%]  ml-4">
                    <h1 className="text-[#b19155] font-extrabold text-xl ml-3 pb-3">Тайлбар:</h1>
                </div>
                <div className="mt-5 w-[90%]  ml-4">
                    <div className="text-[#b19155] font-extrabold text-[16px] ml-5 pb-3">
                        {winner?.winners[0]?.description}
                        <br></br>
                        <br></br>
                        Сугалаа бүтээлцсэн та бүхэндээ талархая дараагийн машин таных болог


                    </div>
                </div>
                <div className="mt-5 w-[90%]  ml-4">
                    <h1 className="text-[#b19155] font-extrabold text-xl ml-3 pb-3">Тохирлын шууд бичлэг:</h1>
                </div>
                <div className="flex justify-center items-center">
                    <iframe
                        src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FDavaagiinMunkhErdene%2Fvideos%2F3019469121570440%2F&show_text=false&width=267&t=0"
                        width="300"
                        height="500"
                        style={{ border: "none", overflow: "hidden" }}
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                </div>

                <div className="w-[80%] flex gap-12 text-[#b19155] border-t-[#b19155] border-t-1 mt-20 ml-10">
                    <a href="https://www.instagram.com/the__ari_ariunbaatar/"><FaInstagram className="text-[#b19155] w-12 h-12 mt-10" /></a>
                    <FaFacebook className="text-[#b19155] w-12 h-12 mt-10" />
                    <FaTwitter className="text-[#b19155] w-12 h-12 mt-10" />
                    <FaPhoneAlt
                        className="text-[#b19155] w-12 h-12 mt-10 cursor-pointer"
                        onClick={() => (window.location.href = "tel:88506930")}
                    />


                </div>
            </div>

           </div>

       </div>
    );

}

