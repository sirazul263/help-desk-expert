import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ParamsType {
  orderId: number;
}

interface ResponseType {
  status: number;
  message: string;
}
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ParamsType>({
    mutationFn: async (params: ParamsType) => {
      const response = await axiosInstance.delete(
        `/api/order/delete-order/${params.orderId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Oder deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });

  return mutation;
};
