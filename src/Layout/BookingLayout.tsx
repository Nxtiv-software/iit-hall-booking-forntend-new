import BookingForm1 from "@/components/BookingForm/BookingForm1"
import BookingForm2 from "@/components/BookingForm/BookingForm2";
import PaginationNav from "@/components/PaginationNav"


const BookingLayout = () => {
    const index = 1;
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
         <PaginationNav/>
      <section className="px-4 py-10 shadow-md sm:min-w-[1000px] sm:px-8 rounded-[10px] border">
 
        {
            index ===1 ? <BookingForm1 
          defaultValues={{
            societyname: "",
            eventtype: "",
            excoposition: "",
            eventtitle: "",
            participants: "",
            excomembername: "",
            description: "",
          }}
          
        /> :
        
        <BookingForm2 
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
        }

        
      </section>

     
    </div>
  )
}

export default BookingLayout
