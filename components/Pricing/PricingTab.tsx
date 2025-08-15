import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "./PricingCard";
import PricingTable from "./PricingTable";

const PricingTab = () => {
  const cards = [
    {
      title: "Getting Started",
      rate: "$14/Hour",
      details: [
        "Per Agent",
        "20-29 Hours/Week",
        "Month to Month",
        "Dedicated and Trained Agent",
        "Quality Assurance Team",
        "One Time $500 Staffing Fee",
      ],
    },
    {
      title: "Essential Plan",
      rate: "$13/Hour",
      details: [
        "Per Agent",
        "30-39 Hours/Week",
        "Month to Month",
        "Dedicated and Trained Agent",
        "Quality Assurance Team",
        "One Time $500 Staffing Fee",
      ],
    },
    {
      title: "Professional Plan",
      rate: "$12/Hour",
      details: [
        "For 1-9 Agents",
        "40 Hours/Week",
        "Month to Month",
        "Dedicated and Trained Agent",
        "Quality Assurance Team",
        "One Time $500 Staffing Fee",
      ],
    },
    {
      title: "Advanced Plan",
      rate: "$10/Hour",
      details: [
        "For 10-24 Agents",
        "40 Hours/Week",
        "Month to Month",
        "Dedicated and Trained Agent",
        "Quality Assurance Team",
        "One Time $500 Staffing Fee",
      ],
    },
    {
      title: "Enterprise Plan",
      rate: "$10/Hour",
      details: [
        "For 25+ Agents",
        "40 Hours/Week",
        "Month to Month",
        "Dedicated and Trained Agent",
        "Quality Assurance Team",
        "One Time $500 Staffing Fee",
      ],
    },
  ];

  return (
    <div className="container">
      <div className="md:my-20 my-4">
        <h1 className="md:text-5xl text-primary font-extrabold text-center mb-3">
          Simple, Transparent <span className="text-gray-700">Pricing.</span>
        </h1>
        <h1 className="md:text-5xl text-gray-700 font-extrabold text-center">
          No Contracts. No Surprises.
        </h1>
      </div>

      <div className="my-5 md:my-20">
        <Tabs defaultValue="customer">
          <div className="mx-auto md:border bg-white rounded-full md:p-2">
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

          <TabsContent value="customer">
            <PricingCard cards={cards} />
          </TabsContent>
          <TabsContent value="executive">
            <PricingCard cards={cards} />
          </TabsContent>
          <TabsContent value="marketing">
            <PricingCard cards={cards} />
          </TabsContent>
          <TabsContent value="influencer">
            <PricingCard cards={cards} />
          </TabsContent>
          <TabsContent value="e-commerce">
            <PricingCard cards={cards} />
          </TabsContent>
          <TabsContent value="ai">
            <PricingTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default PricingTab;
