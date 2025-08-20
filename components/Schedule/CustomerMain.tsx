import "react-phone-input-2/lib/style.css";
import { getCurrentTimeWithZone } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbTimezone } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import PhoneInput from "react-phone-input-2";
interface CustomerMainProps {
  setShowCalendar: (show: boolean) => void;
  selectedDate: Date | undefined;
  selectedTime: string | null;
}

const CustomerMain = ({
  setShowCalendar,
  selectedDate,
  selectedTime,
}: CustomerMainProps) => {
  const router = useRouter();
  const date = format(selectedDate || new Date(), "EEEE, MMMM dd, y");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  enum Services {
    "Customer Support Management" = "customer_support_management",
    "Live Chat Management" = "live_chat_management",
    "Assistance With Admin Tasks" = "assistance_with_admin_tasks",
    "Automate Tickets with AI" = "automate_ticket_with_AI",
    "Other" = "other",
  }
  const meetingSchema = z.object({
    name: z.string("Name is required").min(1, "Name is required"),
    email: z
      .string("Please enter a valid email")
      .email("Please enter a valid  email"),
    companyName: z
      .string("Company Name Domain is required")
      .min(1, "Company Name Domain is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine((val) => /^(\+)?\d{7,15}$/.test(val), {
        message: "Please enter a valid phone number with country code",
      }),
    services: z
      .array(z.nativeEnum(Services))
      .min(1, "Please select at least service"),
    agree: z.literal(true, { error: "You must accept the terms" }),
  });
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      phone: "",
      services: [],
      agree: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    setLoading(true);
    setError(null);
    try {
      const finalValues = {
        ...values,
        date,
        time: selectedTime,
      };
      const res = await axios.post("/api/meeting/create-meeting", finalValues);
      if (res.status === 200) {
        router.push(`/thank-you?Id=${res.data.meeting._id}`);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Left info panel */}
      <div className="w-2/5 p-8 border-r">
        <div className="flex items-center justify-center h-12 w-12 rounded-full border mb-4">
          <FaArrowLeftLong
            size={24}
            className="cursor-pointer"
            onClick={() => setShowCalendar(true)}
          />
        </div>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold ">
            HDX
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-600">Sales Team</p>
            <h2 className="font-bold text-xl leading-6">
              Web - HelpDeskXpert <br /> Intro Call
            </h2>
          </div>
        </div>
        <p className="text-gray-600 flex items-center mb-3 text-sm font-semibold">
          <FaRegClock size={20} className="mr-2" /> 30 Min
        </p>
        <p className="text-gray-600 flex items-center mb-3 text-sm font-semibold">
          <CiCalendar size={22} className="mr-2" /> {selectedTime}, {date}
        </p>
        <p className="text-gray-600 flex items-center mb-4 text-sm font-semibold">
          <TbTimezone size={20} className="mr-2" />{" "}
          {getCurrentTimeWithZone().split("(")[0]}
        </p>
        <p className="text-gray-700 text-sm">
          Book a time to learn more about what we do here at HelpDeskXpert to
          see how we can help you with your customer service needs.
        </p>
      </div>
      {/* Right calendar panel */}
      <div className="p-8 w-3/5">
        <h3 className="font-bold text-xl mb-4">Enter Details</h3>
        <div className="flex flex-col gap-2 max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Email <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Name <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Company name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold mb-3">
                      What Services Are You Enquiring About
                      <span className="text-red-700">*</span>{" "}
                    </FormLabel>
                    <div className="flex flex-col gap-2">
                      {Object.values(Services).map((service) => (
                        <FormField
                          key={service}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(service);
                            return (
                              <FormItem
                                key={service}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...field.value,
                                          service,
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (val: Services) => val !== service
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-extralight text-sm capitalize">
                                  {service.replaceAll("_", " ")}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      {/* Selected  as tags */}
                      {field.value && field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-10">
                          {field.value.map((service) => (
                            <span
                              key={service}
                              className="flex items-center px-3 py-1 rounded-full bg-primary text-white capitalize text-sm "
                            >
                              {service.replaceAll("_", " ")}
                              <button
                                type="button"
                                className="ml-2 text-white hover:text-black "
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter((r) => r !== service)
                                  )
                                }
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">
                      Send text messages to{" "}
                      <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        country={"bd"}
                        value={field.value}
                        onChange={field.onChange}
                        enableSearch={true}
                        countryCodeEditable={false}
                        inputProps={{
                          name: "phone",
                          required: true,
                        }}
                        inputStyle={{
                          width: "100%",
                          height: 52,
                          borderRadius: 38,
                          background: "transparent",
                          paddingLeft: 55,
                        }}
                        buttonStyle={{
                          borderTopLeftRadius: 38,
                          borderBottomLeftRadius: 38,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          border: "1px solid #d1d5db",
                          height: 52,
                          width: 50,
                          paddingLeft: 8,
                        }}
                        containerStyle={{
                          width: "100%",
                          height: 52,
                          marginBottom: 5,
                        }}
                        dropdownStyle={{ zIndex: 9999 }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Full width checkbox */}
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value as unknown as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="grid gap-1">
                        <FormLabel className="leading-5">
                          By proceeding, you confirm that you have read and
                          agree to HelpDeskXpert's Terms of Use and Privacy
                          Notice.
                        </FormLabel>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="flex items-center">
                  <AlertTriangle className="size-5 text-red-700 mr-2" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                size="lg"
                className="px-5"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  "Schedule Event"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CustomerMain;
