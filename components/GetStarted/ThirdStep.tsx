import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
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
import { FormData } from "./GetStartedMain";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ThirdStep = ({ form }: FinalStepProps) => {
  return (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="grid gap-4"
    >
      <div className="flex flex-col gap-y-4">
        <FormField
          name="ticketPerDay"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-4xl font-extrabold mb-3">
                How Many Customer Service Tickets Come In Per Day?
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tickets Per Day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={`0-30`}>0 - 30 Tickets</SelectItem>
                  <SelectItem value={`31-70`}>31-70 Tickets</SelectItem>
                  <SelectItem value={`71-150`}>71 - 150 Tickets</SelectItem>
                  <SelectItem value={`151-300`}>151 - 300 Tickets</SelectItem>
                  <SelectItem value={`301-500`}>301 - 500 Tickets</SelectItem>
                  <SelectItem value={`500+`}>500+ Tickets</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};
export default ThirdStep;
