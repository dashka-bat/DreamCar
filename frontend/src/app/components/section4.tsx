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
type Invoice = {
  Дугаар: React.ReactNode;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
};
const number = [19483294];
const invoices = [
  {
    Дугаар: <h1>{number}</h1>,
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    Дугаар: <h1>{number}</h1>,
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    Дугаар: <h1>{number}</h1>,
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    Дугаар: <h1>{number}</h1>,
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export function Section4() {
  return (
    <>
      <h1 className="text-[#b19155] text-center">Suulin yalagchud</h1>
      <Table className="bg-black border-3 border-[#b19155] mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-[#b19155]">Нэр</TableHead>
            <TableHead className="text-[#b19155]">
              Суглааны <h1>дугаар</h1>
            </TableHead>
            <TableHead className=" text-[#b19155]">Хонжвор</TableHead>
            <TableHead className="text-right text-[#b19155]">Он сар</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((Дугаар: Invoice) => (
            <TableRow key={Дугаар.totalAmount || null}>
              <TableCell className="font-medium text-[#b19155]">
                {Дугаар.Дугаар}
              </TableCell>
              <TableCell className="text-[#b19155]">
                {Дугаар.paymentStatus}
              </TableCell>
              <TableCell className="text-[#b19155]">
                {Дугаар.paymentMethod}
              </TableCell>
              <TableCell className="text-right  text-[#b19155]">
                {Дугаар.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
