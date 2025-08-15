import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const PricingTable = () => {
  const data = [
    { tickets: "100", costPer: "$1.00", totalCost: "$100" },
    { tickets: "300", costPer: "$0.90", totalCost: "$270" },
    { tickets: "500", costPer: "$0.80", totalCost: "$400" },
    { tickets: "1,000", costPer: "$0.60", totalCost: "$600" },
    { tickets: "3,000", costPer: "$0.50", totalCost: "$1,500" },
    { tickets: "10,000", costPer: "$0.40", totalCost: "$4,000" },
  ];
  return (
    <div className="my-10">
      <div className="flex items-center justify-center">
        <div className="bg-[#6aff751a] text-center font-semibold px-4 py-2 rounded-xl  text-gray-900">
          <p className="text-lg font-bold">
            Initial Setup Fee : <span className="text-primary">$2,500</span>
          </p>
          <p className="">One-Time Payment</p>
        </div>
      </div>
      <Table
        className="mx-auto max-w-3xl mt-10 shadow-xl rounded-xl bg-white overflow-hidden mb-5
             transform transition-transform duration-300 hover:scale-105"
      >
        <TableHeader className="bg-[#e4faed] text-lg ">
          <TableRow>
            <TableHead className="py-3 text-center  rounded-tl-xl font-bold">
              Monthly Automated <br /> Tickets
            </TableHead>
            <TableHead className="py-3 text-center font-bold">
              Maintenance Cost <br />
              Per Resolution
            </TableHead>
            <TableHead className="py-3 text-center font-bold rounded-tr-xl">
              Total Monthly <br />
              Maintenance Cost
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text-gray-700 font-semibold text-center py-4 ">
                {row.tickets}
              </TableCell>
              <TableCell className="text-gray-700 font-semibold text-center py-4">
                {row.costPer}
              </TableCell>
              <TableCell className="text-gray-700 font-semibold text-center py-4">
                {row.totalCost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default PricingTable;
