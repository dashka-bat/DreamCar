import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const invoices = [
  {
    Дугаар: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    Дугаар: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    Дугаар: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    Дугаар: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export function Section4() {
  return (
    <Table className="bg-[#0F172A]">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">profile</TableHead>
          <TableHead className=" text-white">Status</TableHead>
          <TableHead className=" text-white">Method</TableHead>
          <TableHead className="text-right  text-white">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((Дугаар) => (
          <TableRow key={Дугаар.totalAmount || null}>
            <TableCell className="font-medium  text-white">
              {Дугаар.Дугаар}
            </TableCell>
            <TableCell className=" text-white">
              {Дугаар.paymentStatus}
            </TableCell>
            <TableCell className=" text-white">
              {Дугаар.paymentMethod}
            </TableCell>
            <TableCell className="text-right  text-white">
              {Дугаар.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
