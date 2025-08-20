import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteOrder } from "@/services/useDeleteOrder";
import { Order } from "@/types/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface ActionButtonsProps {
  data: Order;
  children: React.ReactNode;
}
export const ActionButtons = ({ data, children }: ActionButtonsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Order",
    "This action can not be undone",
    "destructive"
  );
  const { mutate, isPending } = useDeleteOrder();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      orderId: data._id,
    });
  };

  //Update the brand
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {/* {showUpdate && (
        <UpdateBrandModal
          data={data}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
        />
      )} */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => setShowUpdate(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Update Order
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
