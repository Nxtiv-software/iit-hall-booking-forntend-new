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
  preferredbuilding: z.string().min(2, {
    message: "Society name must be at least 2 characters.",
  }),
  preferredroom: z.string().min(2, {
    message: "Event type must be at least 2 characters.",
  }),
  alternateroom: z.string().min(2, {
    message: "Exco position must be at least 2 characters.",
  }),
  
});

const BookingForm3 = <T extends FieldValues>({
  defaultValues,
}: AuthFormProps<T>) => {
  // Helper function to get field labels
  const getFieldLabel = (fieldName: string): string => {
    const labels: Record<string, string> = {
      preferredbuilding: "Preferred Building",
      preferredroom: "Preferred Room",
      alternateroom: "Alternate Room",
    };
    return (
      labels[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  };

  // Helper function to get field placeholders
  const getFieldPlaceholder = (fieldName: string): string => {
    const placeholders: Record<string, string> = {
      preferredbuilding: "Enter preferred building name",
      preferredroom: "Enter preferred room number or name",
      alternateroom: "Enter alternate room number or name",
    };
    return placeholders[fieldName] || `Enter ${fieldName}`;
  };

  // Helper function to get field descriptions
  const getFieldDescription = (fieldName: string): string => {
    const descriptions: Record<string, string> = {
      preferredbuilding: "Select or enter the building you prefer for the event.",
      preferredroom: "Select or enter your first choice of room.",
      alternateroom: "Select or enter an alternative room in case the preferred room is unavailable.",
    };
    return descriptions[fieldName] || `Please enter your ${fieldName}.`;
  };

  const { state, nextPage, prevPage, updateForm3 } = useBooking();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      ...state.form3Data,
    } as DefaultValues<z.infer<typeof formSchema>>,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // You can access the values here
    console.log("All Values:", values);
    updateForm3(values);
    nextPage();
  }

  function handlePrevious() {
    prevPage()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 dark:border-amber-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(defaultValues).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as any}
              render={({ field }) => (
                <FormItem
                  className={`flex-col gap-3 ${
                    fieldName === "description" ? "md:col-span-2" : ""
                  }`}
                >
                  <FormLabel>{getFieldLabel(fieldName)}</FormLabel>
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

      <Button onClick={handlePrevious} className="w-full mt-5">Previous</Button>
    </Form>
  );
};

export default BookingForm3;
