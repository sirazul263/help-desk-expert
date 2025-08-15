import { GiCheckMark } from "react-icons/gi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
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
      <div className="md:my-20">
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
            <div className="container py-5 md:py-20">
              <div className="flex gap-2">
                {cards.map((card, i) => (
                  <Card
                    key={i}
                    className={cn(
                      "w-full h-full rounded-4xl border-2 border-blue-100 bg-white hover:border-blue-300",
                      i == 2 && "mt-[-40px]"
                    )}
                  >
                    <CardHeader className="flex px-4 pt-7">
                      <CardTitle className="text-2xl font-bold">
                        <div>{i == 2 && <button>Hi</button>}</div>
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4">
                      <p className="font-bold text-3xl mb-7">{card.rate}</p>
                      <ul className="text-gray-900 font-semibold">
                        {card.details.map((item, _i) => (
                          <li key={_i} className="mb-2 flex">
                            <GiCheckMark className="text-green-700 me-2 mt-1 text-sm" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default PricingTab;
