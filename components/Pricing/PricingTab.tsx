import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const PricingTab = () => {
  return (
    <div className="container">
      <h1 className="md:text-5xl text-primary font-extrabold text-center mb-3">
        Simple, Transparent <span className="text-gray-700">Pricing.</span>
      </h1>
      <h1 className="md:text-5xl text-gray-700 font-extrabold text-center">
        No Contracts. No Surprises.
      </h1>

      <div className="my-5 md:my-20">
        <Tabs defaultValue="customer">
          <div className="mx-auto md:border rounded-full md:p-2">
            <TabsList className="flex flex-wrap gap-x-6 min-w-max ">
              <TabsTrigger value="customer">Customer Service</TabsTrigger>
              <TabsTrigger value="executive">Executive Assistant</TabsTrigger>
              <TabsTrigger value="marketing">Marketing Assistant</TabsTrigger>
              <TabsTrigger value="influencer">
                Influencer Marketing Specialist
              </TabsTrigger>
              <TabsTrigger value="e-commerce">E-Commerce Sales</TabsTrigger>
              <TabsTrigger value="ai">AI Transformation</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default PricingTab;
