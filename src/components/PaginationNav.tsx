import { useBooking } from "@/AuthProvider/BookingProvider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const PaginationNav = () => {

  const {state} = useBooking()

  return (
  
      <Pagination>
        <PaginationContent>

<div className="flex gap-5">
          <PaginationItem>
            <PaginationLink isActive={state.currentPage === 1}>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive={state.currentPage === 2} >2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive={state.currentPage === 3} >3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive={state.currentPage === 4}>4</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive={state.currentPage === 5}>5</PaginationLink>
          </PaginationItem>
          </div>
{/* 
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          {/* <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem> */}

        </PaginationContent>
      </Pagination>
   
  );
};

export default PaginationNav;
