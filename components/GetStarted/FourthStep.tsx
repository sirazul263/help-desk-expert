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
import { FormData, Marketing } from "./GetStartedMain";
import { Checkbox } from "../ui/checkbox";

const FourthStep = ({ form }: FinalStepProps) => {
  return (
    <motion.div
      key="step-4"
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
                    const isChecked = field.value?.includes(marketing);
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
                                field.onChange([...field.value, marketing]);
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (val: Marketing) => val !== marketing
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
  );
};
export default FourthStep;
