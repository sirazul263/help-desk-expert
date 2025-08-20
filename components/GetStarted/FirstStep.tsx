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
import { Input } from "../ui/input";
const FirstStep = ({ form }: FinalStepProps) => {
  return (
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
  );
};
export default FirstStep;
