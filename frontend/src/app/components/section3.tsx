import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Section3() {
  return (
    <div className="bg-black ml">
      <div className=" text-white text-[1.25rem]">Бүх Сугалаанууд</div>
      <Card className="w-full max-w-sm bg-[#0F172A]">
        {/* <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className="flex justify-between ">
            <div className=" text-white">BMW X5</div>
            <div className="bg-red-700 h-[40px] w-[80px] rounded-md">
              <h1 className="text-center mt-2  text-white"> ДУУССАН</h1>
            </div>
          </div>
          <div>
            <h1 className="text-gray-200">2023.12.20-нд дууссан</h1>
          </div>
          <div className="flex justify-between mt-2.5  text-white">
            <h1>Ялагч: Б.Батбаяр</h1>
            <h1 className="text-gray-200">Дугаар: #4521</h1>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-sm bg-[#0F172A] mt-4">
        {/* <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className="flex justify-between ">
            <div className=" text-white">Prius</div>
            <div className="bg-orange-700 h-[40px] w-[80px] rounded-md">
              <h1 className="text-center mt-2 text-white"> ДУУССАН</h1>
            </div>
          </div>
          <div>
            <h1 className="text-gray-200 ">2023.12.29-нд дууссан</h1>
          </div>
          <div className="flex justify-between mt-2.5  text-white">
            <h1>Ялагч: Б.Батбаяр</h1>
            <h1 className="text-gray-200">Дугаар: #8888</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
