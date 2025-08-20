import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { InfoIcon, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { snakeCaseToTitleCase } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/types";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { ActionButtons } from "@/components/Common/ActionButtons";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Customer Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = `${row.original.firstName} ${row.original.lastName}`;
      return <p className="line-champ-1">{name}</p>;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Email
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Phone Number
        </Button>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Company Name
        </Button>
      );
    },
  },
  {
    accessorKey: "services",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Services
        </Button>
      );
    },
    cell: ({ row }) => {
      const services = row.original.services;
      const marketings = row.original.marketings;
      return (
        <div className="flex items-center">
          <p className="line-clamp-1 pe-2"> Services</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-0">
                <InfoIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h2 className="font-bold text-lg mb-3">Services</h2>
              <ul>
                {services.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center font-medium text-sm leading-none pb-1 capitalize"
                  >
                    <IoMdCheckmarkCircle
                      size={20}
                      className="me-2 text-green-700 "
                    />{" "}
                    {item.replaceAll("_", " ")}
                  </li>
                ))}
              </ul>

              <h2 className="font-bold text-lg my-3">Marketing</h2>
              <ul>
                {marketings.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center font-medium text-sm leading-none pb-1 capitalize"
                  >
                    <IoMdCheckmarkCircle
                      size={20}
                      className="me-2 text-green-700 "
                    />{" "}
                    {item.replaceAll("_", " ")}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Order Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <div>
          <p className="line-champ-1">
            {format(new Date(createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionButtons data={row.original}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </ActionButtons>
      );
    },
  },
];
