import Head from "next/head";
import { withAuth } from "../../lib/withAuth";
import { Sidebar } from "@/components/Admin/Sidebar";
import Layout from "@/components/Layout/Layout";
import { useState } from "react";
import OrderTable from "@/components/Admin/Order/OrderTable";
import { columns } from "@/components/Admin/Order/columns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/Common/DatePicker";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/Common/PageLoader";
import PageError from "@/components/Common/PageError";
import { useGetOrders } from "@/services/useGetOrders";
import { OrderStatus } from "@/types/types";
function OrderPage() {
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [orderDate, setOrderDate] = useState<Date | undefined>(undefined);

  const { data: result, isLoading } = useGetOrders(
    page,
    customer,
    email,
    status,
    orderDate
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const clearFilter = () => {
    setPage(1);
    setEmail("");
    setStatus("");
    setOrderDate(undefined);
  };

  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Layout>
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="flex min-h-screen flex-col">
              <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
                <Sidebar className="sticky top-[5.50rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
                <div className="flex flex-col gap-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col ">
                      <p className="mb-1 text-sm font-semibold"> Customer</p>
                      <Input
                        placeholder="Customer Name"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <p className="mb-1 text-sm font-semibold">
                        {" "}
                        Customer Email
                      </p>
                      <Input
                        placeholder="Customer Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="col-span-4 flex flex-col">
                        <p className="mb-1 text-sm font-semibold">
                          Ordered On{" "}
                        </p>
                        <DatePicker
                          value={orderDate}
                          onChange={(date) => setOrderDate(date)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <p className="mb-1 text-sm font-semibold">Status</p>
                      <Select
                        value={status}
                        onValueChange={(value) => setStatus(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((item) => (
                            <SelectItem value={item} key={item}>
                              <p className="line-champ-1 capitalize">{item}</p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col">
                      <Button className="h-12 md:mt-6" onClick={clearFilter}>
                        Clear Filter
                      </Button>
                    </div>
                    <div />
                  </div>
                  {isLoading ? (
                    <PageLoader />
                  ) : (
                    <OrderTable
                      page={page}
                      handlePageChange={handlePageChange}
                      columns={columns}
                      data={result ? result.data : []}
                      totalPages={result ? result.lastPage : 0}
                      total={result ? result.total : 0}
                    />
                  )}
                </div>
              </div>
              <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

export default OrderPage;
