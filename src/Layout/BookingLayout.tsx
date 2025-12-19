import { useBooking } from "@/AuthProvider/BookingProvider";
import BookingForm1 from "@/components/BookingForm/BookingForm1";
import BookingForm2 from "@/components/BookingForm/BookingForm2";
import BookingForm3 from "@/components/BookingForm/BookingForm3";
import BookingForm4 from "@/components/BookingForm/BookingForm4";
import BookingForm5 from "@/components/BookingForm/BookingForm5";
import PaginationNav from "@/components/PaginationNav";

const BookingLayout = () => {
  const { state } = useBooking();
  return (
    <div className="flex flex-col gap-8 min-h-[90vh] pb-10 mt-10">
      <div className="shrink-0">
        <PaginationNav />
      </div>
      <div className="flex flex-col items-center">
        <section className="px-4 py-10 shadow-md sm:min-w-[1000px] sm:px-8 rounded-[10px] border">
          {state.currentPage === 1 ? (
            <BookingForm1
              defaultValues={{
                societyname: "",
                eventtype: "",
                excoposition: "",
                eventtitle: "",
                participants: "",
                excomembername: "",
                description: "",
              }}
            />
          ) : state.currentPage === 2 ? (
            <BookingForm2
              defaultValues={{
                noofdays: "",
                date: "",
                starttime: "",
                endtime: "",
              }}
            />
          ) : state.currentPage === 3 ? (
            <BookingForm3
              defaultValues={{
                preferredbuilding: "",
                preferredroom: "",
                alternateroom: "",
              }}
            />
          ) : state.currentPage === 4 ? (
            <BookingForm4
              defaultValues={{
                societyname: "",
                eventtype: "",
                excoposition: "",
                eventtitle: "",
                participants: "",
                excomembername: "",
                description: "",
              }}
            />
          ) : state.currentPage === 5 ? (
            <BookingForm5
              defaultValues={{
                societyname: "",
                eventtype: "",
                excoposition: "",
                eventtitle: "",
                participants: "",
                excomembername: "",
                description: "",
              }}
            />
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default BookingLayout;
