import { useBooking } from "@/AuthProvider/BookingProvider";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

const BookingForm5 = () => {
  const { state, nextPage, prevPage, updateForm5 } = useBooking();
  
  const [agreement1, setAgreement1] = useState(state.form5Data?.agreement1 || false);
  const [agreement2, setAgreement2] = useState(state.form5Data?.agreement2 || false);
  const [agreement3, setAgreement3] = useState(state.form5Data?.agreement3 || false);

  useEffect(() => {
    console.log(agreement1, agreement2, agreement3)
  }, [agreement1, agreement2, agreement3])

  // 2. Define a submit handler.
  function onSubmit() {
    const form5Values = {
      agreement1,
      agreement2,
      agreement3,
    };
    
    console.log("Form 5 Values:", form5Values);
    updateForm5(form5Values);
    nextPage();
  }

  function handlePrevious() {
    prevPage();
  }

  return (
    <section className="h-full">
      <div className="flex flex-col h-full">
        <h1 className="text-center mb-10 text-2xl font-semibold">
          Approval and Attachments
        </h1>
        <div className="flex flex-col gap-5">
          <p>Attach Event Proposal</p>
          <div className="flex gap-8 items-center">
            <Button>Choose a file</Button>
            <p>No file selected</p>
          </div>
          <p className="text-muted-foreground text-xs">
            Accepted formats: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-10 dark:bg-[#0e0e0e] p-5 border rounded-lg">
          <div className="flex gap-3">
            <Checkbox
              id="agreement-1"
              checked={agreement1}
              onCheckedChange={(checked) => setAgreement1(checked as boolean)}
            />
            <Label>I agree to the terms and conditions for hall booking.</Label>
          </div>
          <div className="flex gap-3">
            <Checkbox
              id="agreement-2"
              checked={agreement2}
              onCheckedChange={(checked) => setAgreement2(checked as boolean)}
            />
            <Label>I confirm that all information provided is accurate.</Label>
          </div>
          <div className="flex gap-3">
            <Checkbox
              id="agreement-3"
              checked={agreement3}
              onCheckedChange={(checked) => setAgreement3(checked as boolean)}
            />
            <Label>
              I understand that this booking is subject to approval.
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <Button onClick={onSubmit} className="w-full">
            Submit Booking
          </Button>
          <Button onClick={handlePrevious} className="w-full" variant="outline">
            Previous
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingForm5;
