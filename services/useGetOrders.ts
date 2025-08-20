import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useGetOrders = (
  page: number,
  customer: string,
  email: string,
  status: string,
  orderDate: Date | undefined
) => {
  const date = orderDate ? format(orderDate, "dd/MM/yyyy") : "";
  const debouncedCustomer = useDebouncedValue(customer, 500);

  const query = useQuery({
    queryKey: ["orders", page, debouncedCustomer, email, status, date],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/order/get-orders`, {
        params: {
          page,
          customer: debouncedCustomer,
          email,
          status,
          date,
        },
      });
      if (response.status !== 200) {
        return {
          status: response.status,
          message: getErrorMessage(response),
        };
      }
      return response.data;
    },
  });
  return query;
};
