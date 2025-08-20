import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
type FinalStepProps = {
  form: UseFormReturn<FormData>;
};

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { FormData } from "./GetStartedMain";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PhoneInput from "react-phone-input-2";

const FinalStep = ({ form }: FinalStepProps) => {
  enum Referer {
    "Referred By Client" = "referred_by_client",
    "Google" = "google",
    "Outbound Main" = "outbound_mail",
    "Linkedin Add" = "linkedin_add",
    "Other" = "other",
  }
  return (
    <motion.div
      key="step-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="rounded-2xl p-4 grid gap-2">
        <h1 className="text-4xl font-extrabold mb-3">
          How can we contact you?
        </h1>
        <p>
          One of our specialists will reach out to learn more about your
          customer service needs.
        </p>
      </div>

      {/* Grid wrapper for fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                First Name <span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                Last Name <span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Last Name" {...field} />
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
                <Input placeholder="Enter Your Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                Business Domain <span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Business Domain" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1">
              Phone Number <span className="text-red-700">*</span>
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
      <FormField
        name="referrer"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              How Did You Hear About Us?
            </FormLabel>

            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="How Did You Hear About Us?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(Referer).map((referrer) => (
                  <SelectItem
                    className="font-medium text-lg text-primary capitalize"
                    value={referrer}
                    key={referrer}
                  >
                    {referrer.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <div className="grid gap-1 leading-none">
                <FormLabel className="!m-0">
                  By creating an account you agree to our Terms & Conditions &
                  Privacy Policy
                </FormLabel>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-full  text-sm bg-red-200 px-5 py-2 text-gray-700">
        Your data will only be used for someone at HelpDeskXpert to contact you
        to discuss your CX needs.
      </div>
    </motion.div>
  );
};

export default FinalStep;
