import { useEffect, useState } from "react";
import { useBooking } from "@/AuthProvider/BookingProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { auth } from "@/Firebase/config";

interface Resource {
  id: string;
  name: string;
  description?: string;
}

const BookingForm4 = () => {
  const { state, nextPage, prevPage, updateForm4 } = useBooking();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResources, setSelectedResources] = useState<Record<string, boolean>>({});

  const [additionalNotes, setAdditionalNotes] = useState(state.form4Data?.additionalNotes || "");

  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:8800/resources/available", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return console.error("Failed to fetch resources");
      const data: Resource[] = await res.json();
      setResources(data);

      const initialSelected: Record<string, boolean> = {};
      data.forEach((r) => {
        initialSelected[r.id] = state.form4Data?.resourceIds?.includes(r.id) || false;
      });
      setSelectedResources(initialSelected);
    };

    fetchResources();
  }, []);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedResources((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = () => {
    // const form4Values = {
    //   ...selectedResources,
    //   additionalNotes,
    // };
    // console.log("Form 4 Values:", form4Values);
    // updateForm4(form4Values);
    // nextPage();
    const selectedResourceIds = Object.entries(selectedResources)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);

    const form4Values = {
      additionalNotes,
      resourceIds: selectedResourceIds,
    };

    console.log("Form 4 Values:", form4Values);

    updateForm4(form4Values);
    nextPage();
  };

  const handlePrevious = () => prevPage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Required Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((r) => (
          <div key={r.id} className="flex items-start gap-3">
            <Checkbox
              id={r.id}
              checked={selectedResources[r.id] || false}
              onCheckedChange={(checked) => handleCheckboxChange(r.id, checked as boolean)}
            />
            <div className="grid gap-1">
              <Label htmlFor={r.id} className="cursor-pointer">{r.name}</Label>
              {r.description && (
                <p className="text-muted-foreground text-xs">{r.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes">Additional Notes</Label>
        <textarea
          id="additional-notes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Any special requirements or additional resources needed..."
          className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-muted-foreground text-xs">
          Provide any additional information about your resource requirements.
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={handleSubmit} className="w-full">
          Next
        </Button>
        <Button onClick={handlePrevious} className="w-full" variant="outline">
          Previous
        </Button>
      </div>
    </div>
  );
};

export default BookingForm4;
