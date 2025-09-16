export function Section2() {
    return (
        <div className="w-full flex jutsify-center items-center flex-col mt-15">
            <h1 className="self-start text-2xl font-bold">Одоогийн Сугалаа</h1>

            <div className="bg-[#0F172A] rounded-lg w-[354px] h-[306px] mt-5 border-[0.5px] border-[#2E3A4B] p-4">
                <div className="flex justify-between">
                    <h3 className="text-[#4ADE80]">ИДЭВХТЭЙ</h3>
                    <h4 className="text-[#777d86]">2024.01.15 хүртэл</h4>
                </div>

                <h2 className="text-xl font-bold mt-4">Mercedes-Benz C200</h2>
                <h3 className="text-[#777d86]">2024 оны шинэ загвар, бүрэн тоноглогдсон</h3>

                <div className="flex justify-between mt-5 px-4">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold">45,000₮</h2>
                        <h3 className="text-[#777d86]">Тасалбарын үнэ</h3>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold">1,247</h2>
                        <h3 className="text-[#777d86]">Зарагдсан</h3>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-5">
                    <h3 className="text-[#777d86] self-center flex">62% зарагдсан (2000-аас)</h3>
                </div>

                <button className="w-full self-center mt-2 px-4 py-6 h-10 bg-white text-black flex justify-center items-center font-bold text-lg rounded-lg">Тасалбар худалдаж авах</button>
            </div>
        </div>
    )
}