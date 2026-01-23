import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useBooking } from "@/AuthProvider/BookingProvider";
import { auth } from "@/Firebase/config";

const formSchema = z.object({
  preferredbuilding: z.string().min(1, "Please select a building"),
  preferredroom: z.string().min(1, "Please select a room"),
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
    const fetchBuildings = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken(); 
      
      const res = await fetch("http://localhost:8800/buildings/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setBuildings(Array.isArray(data) ? data : []);
    };

    fetchBuildings();
  }, []);


  // Fetch venues when building changes
  useEffect(() => {
    const buildingId = form.watch("preferredbuilding");
    if (!buildingId) {
      setVenues([]);
      form.setValue("preferredroom", "");
      return;
    }

    const fetchVenues = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken(); 
      const res = await fetch(`http://localhost:8800/buildings/${buildingId}/venues`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVenues(Array.isArray(data) ? data : []);
      setAlternateVenues(Array.isArray(data) ? data : []);
    };

    fetchVenues();
  }, [form.watch("preferredbuilding")]);


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateForm3(values);
    nextPage();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormItem>
          <FormLabel>Preferred Building</FormLabel>
          <FormControl>
            <Controller
              name="preferredbuilding"
              control={form.control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-md border border-input px-3 py-2"
                >
                  <option value="">Select a building</option>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.id} className="text-black">
                      {b.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.preferredbuilding?.message}</FormMessage>
        </FormItem>
        <FormItem>
          <FormLabel>Preferred Room</FormLabel>
          <FormControl>
            <Controller
              name="preferredroom"
              control={form.control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-md border border-input px-3 py-2"
                  disabled={!venues.length}
                >
                  <option value="">Select a room</option>
                  {venues.map((v) => (
                    <option key={v.id} value={v.id} className="text-black">
                      {v.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.preferredroom?.message}</FormMessage>
        </FormItem>
        <FormItem>
          <FormLabel>Alternate Room</FormLabel>
          <FormControl>
            <Controller
              name="alternateroom"
              control={form.control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-md border border-input px-3 py-2"
                  disabled={!venues.length}
                >
                  <option value="">Select an alternate room</option>
                  {alternateVenues.map((av) => (
                    <option key={av.id} value={av.id} className="text-black">
                      {av.name}
                    </option>
                  ))}
                </select>
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
