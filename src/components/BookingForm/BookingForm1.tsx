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

interface AuthFormProps<T extends FieldValues> {
  defaultValues: T;
}

const formSchema = z.object({
  societyname: z.string().min(2, {
    message: "Society name must be at least 2 characters.",
  }),
  eventtype: z.string().min(2, {
    message: "Event type must be at least 2 characters.",
  }),
  excoposition: z.string().min(2, {
    message: "Exco position must be at least 2 characters.",
  }),
  eventtitle: z.string().min(2, {
    message: "Event name/title must be at least 2 characters.",
  }),
  participants: z.string().min(1, {
    message: "Number of participants is required.",
  }).regex(/^[0-9]+$/, {
    message: "Please enter a valid number.",
  }),
  excomembername: z.string().min(2, {
    message: "Exco member name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Purpose/Description must be at least 10 characters.",
  }),
});

const BookingForm1 = <T extends FieldValues>({
  defaultValues,
}: AuthFormProps<T>) => {

  // Helper function to get field labels
  const getFieldLabel = (fieldName: string): string => {
    const labels: Record<string, string> = {
      societyname: "Society Name",
      eventtype: "Event Type",
      excoposition: "Exco Position",
      eventtitle: "Event Name/Title",
      participants: "Number of Participants",
      excomembername: "Exco Member Name",
      description: "Purpose/Description",
    };
    return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  // Helper function to get field placeholders
  const getFieldPlaceholder = (fieldName: string): string => {
    const placeholders: Record<string, string> = {
      societyname: "Enter your society name",
      eventtype: "e.g., Workshop, Seminar, Conference",
      excoposition: "e.g., President, Secretary, Treasurer",
      eventtitle: "Enter the event name or title",
      participants: "Enter number of participants",
      excomembername: "Enter exco member's full name",
      description: "Describe the purpose and details of your event",
    };
    return placeholders[fieldName] || `Enter ${fieldName}`;
  };

  // Helper function to get field descriptions
  const getFieldDescription = (fieldName: string): string => {
    const descriptions: Record<string, string> = {
      societyname: "Name of your society or organization.",
      eventtype: "Type or category of the event.",
      excoposition: "Your position in the executive committee.",
      eventtitle: "Official name or title of the event.",
      participants: "Expected number of participants.",
      excomembername: "Name of the responsible exco member.",
      description: "Provide details about the event purpose and activities.",
    };
    return descriptions[fieldName] || `Please enter your ${fieldName}.`;
  };

  const { nextPage, prevPage, goToPage } = useBooking();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<z.infer<typeof formSchema>>,
  });
  

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // You can access the values here
    console.log("All Values:", values);
nextPage()

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 dark:border-amber-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(defaultValues).map((fieldName) => (
        <FormField 
        key={fieldName}
          control={form.control}
          name={fieldName as any}
          render={({ field }) => (
            <FormItem className={`flex-col gap-3 ${fieldName === "description" ? "md:col-span-2" : ""}`}>
              <FormLabel>
                {getFieldLabel(fieldName)}
              </FormLabel>
              <FormControl>
                {fieldName === "description" ? (
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={getFieldPlaceholder(fieldName)}
                    {...field}
                  />
                ) : (
                  <Input 
                    type={fieldName === "participants" ? "number" : "text"}
                    placeholder={getFieldPlaceholder(fieldName)}
                    {...field} 
                  />
                )}
              </FormControl>
              {/* <FormDescription>
                {getFieldDescription(fieldName)}
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        ))}
        </div>
        <Button type="submit" className="w-full">Next</Button>

        
      </form>
    </Form>
  );
};

export default BookingForm1;
