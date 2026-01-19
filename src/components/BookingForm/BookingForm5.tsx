import { useBooking } from "@/AuthProvider/BookingProvider";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudentRequest } from "@/Services/Students";
import toast from "react-hot-toast";

const BookingForm5 = () => {
  const { state, prevPage, updateForm5, resetBooking } = useBooking();
  const navigate = useNavigate();

  const [agreement1, setAgreement1] = useState(
    state.form5Data?.agreement1 || false
  );
  const [agreement2, setAgreement2] = useState(
    state.form5Data?.agreement2 || false
  );
  const [agreement3, setAgreement3] = useState(
    state.form5Data?.agreement3 || false
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(agreement1, agreement2, agreement3);
  }, [agreement1, agreement2, agreement3]);

  // 2. Define a submit handler.
  async function onSubmit() {
    if (!agreement1 || !agreement2 || !agreement3) {
      toast.error("Please agree to all terms and conditions", {
        duration: 4000,
      });
      return;
    }

    const form5Values = {
      agreement1,
      agreement2,
      agreement3,
    };

    console.log("Form 5 Values:", form5Values);
    updateForm5(form5Values);

    const bookingData = {
      venueId: "8da1c588-e442-43a7-ae2d-c095ee90b89e",
      requiredDate: "2026-01-20T10:00:00.000Z",
      form1Data: state.form1Data,
      form2Data: state.form2Data,
      form3Data: state.form3Data,
      form4Data: state.form4Data,
      form5Data: form5Values,
    };

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token"); // or get from your auth context

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await createStudentRequest(token, bookingData);
      console.log("Booking created successfully:", response);

      // Clear booking data from local storage after successful submission
      resetBooking();

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
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
