import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useBooking } from "@/AuthProvider/BookingProvider";
import { auth } from "@/Firebase/config";
import { fetchAllVenues } from "@/Services/Venues";
import { fetchAllBuildings } from "@/Services/Buildings";

const formSchema = z.object({
  preferredbuilding: z.string().min(1, "Please select a building"),
  preferredroom: z.string().min(1, "Please select a room"),
  alternateroom: z.string().optional(),
});

const BookingForm3 = ({ defaultValues }: { defaultValues: any }) => {
  const { state, nextPage, prevPage, updateForm3 } = useBooking();
  const [buildings, setBuildings] = useState<{ id: string; name: string }[]>([]);
  const [venues, setVenues] = useState<{ id: string; name: string }[]>([]);
  const [alternateVenues, setAlternateVenues] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      ...state.form3Data,
    },
  });

  // Fetch all buildings 
  useEffect(() => {
    const getBuildings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const data = await fetchAllBuildings(token);
        setBuildings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching buildings:", err);
        setBuildings([]);
      }
    };

    getBuildings();
  }, []);

  // Fetch venues 
  const fetchVenues = async () => {
    const buildingId = form.getValues("preferredbuilding");
    if (!buildingId) {
      setVenues([]);
      setAlternateVenues([]);
      form.setValue("preferredroom", "");
      form.setValue("alternateroom", "");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const data = await fetchAllVenues(token);
      const filtered = data.filter((v: any) => v.buildingId === buildingId);
      setVenues(filtered);
      setAlternateVenues(filtered);
    } catch (err) {
      console.error("Error fetching venues:", err);
      setVenues([]);
      setAlternateVenues([]);
    }
  };

  // Fetch venues whenever preferred building changes
  useEffect(() => {
    fetchVenues();
  }, [form.watch("preferredbuilding")]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateForm3(values);
    nextPage();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Preferred Building */}
        <FormItem>
          <FormLabel>Preferred Building</FormLabel>
          <FormControl>
            <Controller
              name="preferredbuilding"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full rounded-md border border-input">
                    <SelectValue placeholder="Select a building" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.preferredbuilding?.message}</FormMessage>
        </FormItem>

        {/* Preferred Room */}
        <FormItem>
          <FormLabel>Preferred Room</FormLabel>
          <FormControl>
            <Controller
              name="preferredroom"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={!venues.length}>
                  <SelectTrigger className="w-full rounded-md border border-input">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.preferredroom?.message}</FormMessage>
        </FormItem>

        {/* Alternate Room */}
        <FormItem>
          <FormLabel>Alternate Room</FormLabel>
          <FormControl>
            <Controller
              name="alternateroom"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!alternateVenues.length}
                >
                  <SelectTrigger className="w-full rounded-md border border-input">
                    <SelectValue placeholder="Select an alternate room" />
                  </SelectTrigger>
                  <SelectContent>
                    {alternateVenues
                      .filter((v) => v.id !== form.getValues("preferredroom"))
                      .map((av) => (
                        <SelectItem key={av.id} value={av.id}>
                          {av.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.alternateroom?.message}</FormMessage>
        </FormItem>

        <Button type="submit" className="w-full mt-4">
          Next
        </Button>
        <Button type="button" onClick={prevPage} className="w-full mt-2">
          Previous
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm3;
