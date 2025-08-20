import * as React from "react";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import {
  Loader2,
  CheckCircle2,
  ChevronLeft,
  AlertTriangle,
} from "lucide-react";
import CommonButton from "../Common/CommonButton";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FinalStep from "./FinalStep";
import { useRouter } from "next/router";
import axios from "axios";

interface GetStartedMainProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const companySchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
});

export enum Service {
  "Customer Service" = "customer_service",
  "Marketing & Graphic Design" = "marketing_&_graphic_design",
}

const serviceSchema = z.object({
  services: z
    .array(z.nativeEnum(Service))
    .min(1, "Please select at least one service"),
});

const ticketSchema = z.object({
  ticketPerDay: z.string().min(1, "Tickets per day is required"),
});

export enum Marketing {
  "E-Commerce Management" = "e_commerce_management",
  "Reporting & Data Analysis" = "reporting_&_data_analysis",
  "Administrative" = "administrative",
  "SEO" = "SEO",
  "Graphic Design" = "graphic_design",
  "Video Editing" = "video_editing",
  "Email Marketing" = "email_marketing",
  "Social Media Content Creation" = "social_media_content_creation",
  "Other" = "other",
}

const marketingSchema = z.object({
  marketings: z
    .array(z.nativeEnum(Marketing))
    .min(1, "Please select at least service"),
});

const finalSchema = z.object({
  firstName: z
    .string("First Name is required")
    .min(1, "First Name is required"),
  lastName: z.string("Last Name is required").min(1, "Last Name is required"),
  email: z
    .string("Please enter a valid business email")
    .email("Please enter a valid business email"),
  domain: z
    .string("Business Domain is required")
    .min(1, "Business Domain is required")
    .url("Please enter a valid URL, e.g., https://example.com"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^(\+)?\d{7,15}$/.test(val), {
      message: "Please enter a valid phone number with country code",
    }),
  referrer: z.string("Referrer is required").min(1, "Referrer is required"),
  agree: z.literal(true, { error: "You must accept the terms" }),
});

const formSchema = companySchema
  .merge(serviceSchema)
  .merge(ticketSchema)
  .merge(marketingSchema)
  .merge(finalSchema);

export type FormData = z.infer<typeof formSchema>;

const GetStartedMain = ({ step, setStep }: GetStartedMainProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const steps = useMemo(
    () => [
      { key: "first", label: "First" },
      { key: "company", label: "Company" },
      { key: "service", label: "Service" },
      { key: "tickets", label: "Tickets" },
      { key: "marketing", label: "Marketing" },
      { key: "confirm", label: "Confirm" },
    ],
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      services: [],
      marketings: [],
      ticketPerDay: "",
      // agree: false,
    },
  });

  const currentProgress = ((step + 1) / steps.length) * 100;

  // Field groups per step for partial validation
  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["companyName"],
    2: ["services"],
    3: ["ticketPerDay"],
    4: ["marketings"],
    5: ["firstName", "lastName", "email", "domain", "referrer", "agree"],
  };

  async function next() {
    const fields = stepFields[step];
    if (!fields) return;
    const ok = await form.trigger(fields, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(s + 1, steps.length));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }
  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/order/create-order", values);
      if (res.data.status === 1) {
        router.push("/calendar");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full grid  p-4 md:py-20">
      <div className="space-y-2 mb-10 w-full">
        <div className="flex items-center text-sm text-muted-foreground">
          <Progress value={currentProgress} />
          <span className="ms-3 text-lg  text-gray-900 font-bold">
            {Math.round(currentProgress)}%
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && <FirstStep form={form} />}
            {step === 2 && <SecondStep form={form} />}
            {step === 3 && <ThirdStep form={form} />}
            {step === 4 && <FourthStep form={form} />}
            {step === 5 && <FinalStep form={form} />}
          </AnimatePresence>
          {error && (
            <div className="flex items-center">
              <AlertTriangle className="size-5 text-red-700 mr-2" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={prev}
              disabled={step === 0 || form.formState.isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < steps.length - 1 ? (
              <CommonButton
                title={"Next"}
                onClick={next}
                disabled={form.formState.isSubmitting}
              />
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting || loading}
              >
                {form.formState.isSubmitting || loading ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Submitting…
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Submit
                  </span>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GetStartedMain;
