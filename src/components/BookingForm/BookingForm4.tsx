
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { useBooking } from "@/AuthProvider/BookingProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  participants: z
    .string()
    .min(1, {
      message: "Number of participants is required.",
    })
    .regex(/^[0-9]+$/, {
      message: "Please enter a valid number.",
    }),
  excomembername: z.string().min(2, {
    message: "Exco member name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Purpose/Description must be at least 10 characters.",
  }),
});

const BookingForm4 = <T extends FieldValues>({
  defaultValues,
}: AuthFormProps<T>) => {
  const { state, nextPage, prevPage, updateForm4 } = useBooking();

  // State for checkboxes - Load from localStorage
  const [soundSystem, setSoundSystem] = useState(state.form4Data?.soundSystem || false);
  const [iitBranding, setIitBranding] = useState(state.form4Data?.iitBranding || false);
  const [projector, setProjector] = useState(state.form4Data?.projector || false);
  const [wifiCredentials, setWifiCredentials] = useState(state.form4Data?.wifiCredentials || false);
  const [tablesChairSetup, setTablesChairSetup] = useState(state.form4Data?.tablesChairSetup || false);
  const [zoomPackage, setZoomPackage] = useState(state.form4Data?.zoomPackage || false);
  const [podium, setPodium] = useState(state.form4Data?.podium || false);
  const [additionalNotes, setAdditionalNotes] = useState(state.form4Data?.additionalNotes || "");

  

  // 2. Define a submit handler.
  function handleSubmit() {
    const form4Values = {
      soundSystem,
      iitBranding,
      projector,
      wifiCredentials,
      tablesChairSetup,
      zoomPackage,
      podium,
      additionalNotes,
    };
    
    console.log("Form 4 Values:", form4Values);
    updateForm4(form4Values);
    nextPage();
  }

  function handlePrevious() {
    prevPage();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Required Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sound System */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="sound-system" 
            checked={soundSystem}
            onCheckedChange={(checked) => setSoundSystem(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="sound-system" className="cursor-pointer">Sound System</Label>
            <p className="text-muted-foreground text-xs">
              Audio equipment for presentations and events.
            </p>
          </div>
        </div>

        {/* IIT Branding */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="iit-branding" 
            checked={iitBranding}
            onCheckedChange={(checked) => setIitBranding(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="iit-branding" className="cursor-pointer">IIT Branding</Label>
            <p className="text-muted-foreground text-xs">
              Official IIT branding materials and banners.
            </p>
          </div>
        </div>

        {/* Projector */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="projector" 
            checked={projector}
            onCheckedChange={(checked) => setProjector(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="projector" className="cursor-pointer">Projector</Label>
            <p className="text-muted-foreground text-xs">
              Display equipment for presentations.
            </p>
          </div>
        </div>

        {/* Wifi Credentials */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="wifi-credentials" 
            checked={wifiCredentials}
            onCheckedChange={(checked) => setWifiCredentials(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="wifi-credentials" className="cursor-pointer">Wifi Credentials</Label>
            <p className="text-muted-foreground text-xs">
              Guest WiFi access for participants.
            </p>
          </div>
        </div>

        {/* Tables/Chair Setup */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="tables-chair-setup" 
            checked={tablesChairSetup}
            onCheckedChange={(checked) => setTablesChairSetup(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="tables-chair-setup" className="cursor-pointer">Tables/Chair Setup</Label>
            <p className="text-muted-foreground text-xs">
              Custom seating arrangement.
            </p>
          </div>
        </div>

        {/* Zoom Package */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="zoom-package" 
            checked={zoomPackage}
            onCheckedChange={(checked) => setZoomPackage(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="zoom-package" className="cursor-pointer">Zoom Package</Label>
            <p className="text-muted-foreground text-xs">
              Online meeting setup and support.
            </p>
          </div>
        </div>

        {/* Podium */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="podium" 
            checked={podium}
            onCheckedChange={(checked) => setPodium(checked as boolean)}
          />
          <div className="grid gap-1">
            <Label htmlFor="podium" className="cursor-pointer">Podium</Label>
            <p className="text-muted-foreground text-xs">
              Speaker podium or lectern.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Notes Textarea */}
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