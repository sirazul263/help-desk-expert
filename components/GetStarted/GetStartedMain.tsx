import * as React from "react";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Loader2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import CommonButton from "../Common/CommonButton";

interface GetStartedMainProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const GetStartedMain = ({ step, setStep }: GetStartedMainProps) => {
  const companySchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    // email: z.string().email("Please enter a valid email"),
  });

  enum Service {
    "Customer Service" = "customer_service",
    "Marketing & Graphic Design" = "marketing_&_graphic_design",
  }

  const serviceSchema = z.object({
    services: z
      .array(z.nativeEnum(Service))
      .min(1, "Please select at least one service"),
    // bio: z.string().max(280, "Max 280 characters").optional(),
    // agree: z.literal(false, { error: "You must accept the terms" }),
  });

  enum Marketing {
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
    receiveEmails: z.boolean(),
  });

  const formSchema = companySchema
    .merge(serviceSchema)
    .merge(marketingSchema)
    .merge(finalSchema);
  type FormData = z.infer<typeof formSchema>;

  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const steps = useMemo(
    () => [
      { key: "first", label: "First" },
      { key: "company", label: "Company" },
      { key: "service", label: "Service" },
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
      // agree: false,
      receiveEmails: true, // fine, even if schema says optional
    },
  });

  const currentProgress = ((step + 1) / steps.length) * 100;

  // Field groups per step for partial validation
  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["companyName"],
    2: ["services"],
    3: ["marketings"],
    4: ["receiveEmails"],
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
    // Simulate submit
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(values);
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
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-4xl font-extrabold mb-3">
                        What’s the name of your company?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-4xl font-extrabold mb-3">
                        What Are You Needing Assistance With?
                      </FormLabel>
                      <div className="flex flex-col gap-2">
                        {Object.values(Service).map((service) => (
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
                                              (val: Service) => val !== service
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium text-xl capitalize">
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

                {/* <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us a little about yourself…"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Max 280 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value as unknown as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="grid gap-1 leading-none">
                        <FormLabel className="!m-0">
                          I agree to the Terms
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          You must accept to continue.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="marketings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-4xl font-extrabold mb-3">
                        What Marketing Tasks Are You Looking To Have Covered?
                      </FormLabel>
                      <div className="flex flex-col gap-2">
                        {Object.values(Marketing).map((marketing) => (
                          <FormField
                            key={marketing}
                            control={form.control}
                            name="marketings"
                            render={({ field }) => {
                              const isChecked =
                                field.value?.includes(marketing);
                              return (
                                <FormItem
                                  key={marketing}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([
                                            ...field.value,
                                            marketing,
                                          ]);
                                        } else {
                                          field.onChange(
                                            field.value.filter(
                                              (val: Marketing) =>
                                                val !== marketing
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium text-xl capitalize">
                                    {marketing.replaceAll("_", " ")}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        {/* Selected  as tags */}
                        {field.value && field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-10">
                            {field.value.map((marketing) => (
                              <span
                                key={marketing}
                                className="flex items-center px-3 py-1 rounded-full bg-primary text-white capitalize text-sm "
                              >
                                {marketing.replaceAll("_", " ")}
                                <button
                                  type="button"
                                  className="ml-2 text-white hover:text-black "
                                  onClick={() =>
                                    field.onChange(
                                      field.value.filter((r) => r !== marketing)
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
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border p-4 grid gap-2">
                  <h3 className="font-medium">Review</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <ReviewItem
                      label="First name"
                      value={form.getValues("companyName")}
                    />
                    <ReviewItem
                      label="Role"
                      value={form.getValues("services").join(", ") || "—"}
                    />
                    <ReviewItem
                      label="Marketing Tasks"
                      value={form.getValues("marketings").join(", ") || "—"}
                    />
                    {/* <ReviewItem
                      label="Bio"
                      value={form.getValues("bio") || "—"}
                    />
                    <ReviewItem
                      label="Terms accepted"
                      value={String(form.getValues("agree"))}
                    /> */}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="receiveEmails"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="grid gap-1 leading-none">
                        <FormLabel className="!m-0">
                          Email me product updates
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          You can unsubscribe anytime.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
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

      {submitted && (
        <div className="mt-6 rounded-2xl border p-4">
          <h4 className="mb-2 font-semibold">Submitted payload</h4>
          <pre className="text-sm overflow-auto p-3 bg-muted rounded-lg">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default GetStartedMain;
