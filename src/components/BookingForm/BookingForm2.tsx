import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBooking } from "@/AuthProvider/BookingProvider";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import { useState } from "react";

interface AuthFormProps<T extends FieldValues> {
  defaultValues: T;
}

const formSchema = z.object({
  noofdays: z
    .string()
    .min(1, {
      message: "Number of days is required.",
    })
    .regex(/^[1-9][0-9]*$/, {
      message: "Please enter a valid number of days (minimum 1).",
    })
    .refine((val) => parseInt(val) <= 365, {
      message: "Number of days cannot exceed 365.",
    }),
});

const BookingForm2 = <T extends FieldValues>({
  defaultValues,
}: AuthFormProps<T>) => {
  // Helper function to get field labels
  const getFieldLabel = (fieldName: string): string => {
    const labels: Record<string, string> = {
      noofdays: "No of Days",
      date: "Date",
      starttime: "Start Time",
      endtime: "End Time",
    };
    return (
      labels[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  };

  // Helper function to get field placeholders
  const getFieldPlaceholder = (fieldName: string): string => {
    const placeholders: Record<string, string> = {
      noofdays: "Enter no of days",
      date: "Enter the date of the venue",
      starttime: "Enter the starting time",
      endtime: "Enter the end time",
    };
    return placeholders[fieldName] || `Enter ${fieldName}`;
  };

  // Helper function to get field descriptions
  const getFieldDescription = (fieldName: string): string => {
    const descriptions: Record<string, string> = {
      noofdays: "Number of days that needs.",
      date: "The date that event helds on.",
      starttime: "Starting time of the event.",
      endtime: "Ending time of the event.",
    };
    return descriptions[fieldName] || `Please enter your ${fieldName}.`;
  };

  const { state, nextPage, prevPage, updateForm2 } = useBooking();
  const [datevalue, setDatevalue] = useState(state.form2Data?.datevalue || "");
  const [startingTime, setStartingTime] = useState(state.form2Data?.startingTime || "");
  const [endingTime, setEndingTime] = useState(state.form2Data?.endingTime || "");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues, ...state.form2Data } as DefaultValues<
      z.infer<typeof formSchema>
    >,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // You can access the values here
    console.log("All Values:", values);
    console.log("Date:", datevalue);
    console.log("Start Time:", startingTime);
    console.log("End Time:", endingTime);

    const form2values = {
      ...values,
      datevalue,
      startingTime,
      endingTime,
    };
    updateForm2(form2values);
    nextPage();
  }

  function handlePrevious() {
    prevPage();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(defaultValues).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as any}
              render={({ field }) => (
                <FormItem
                  className={fieldName === "description" ? "md:col-span-2" : ""}
                >
                  <FormLabel>{getFieldLabel(fieldName)}</FormLabel>
                  <FormControl>
                    {fieldName === "description" ? (
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={getFieldPlaceholder(fieldName)}
                        {...field}
                      />
                    ) : fieldName === "date" ? (
                      <DatePicker
                        datevalue={datevalue}
                        setDatevalue={setDatevalue}
                      />
                    ) : fieldName === "starttime" ? (
                      <TimePicker
                        timevalue={startingTime}
                        setTimevalue={setStartingTime}
                      />
                    ) : fieldName === "endtime" ? (
                      <TimePicker
                        timevalue={endingTime}
                        setTimevalue={setEndingTime}
                      />
                    ) : (
                      <Input
                        type={fieldName === "participants" ? "number" : "text"}
                        placeholder={getFieldPlaceholder(fieldName)}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    {getFieldDescription(fieldName)}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
      <Button onClick={handlePrevious} className="w-full mt-5">
        Previous
      </Button>
    </Form>
  );
};

export default BookingForm2;
