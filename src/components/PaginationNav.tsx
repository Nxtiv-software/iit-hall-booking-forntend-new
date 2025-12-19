import { useBooking } from "@/AuthProvider/BookingProvider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationNav = () => {

  const {state, goToPage} = useBooking()

  const handleClick = (page) => {
goToPage(page)
  }
  return (
  
      <Pagination>
        <PaginationContent>

          {/* <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem> */}

<div className="flex gap-5">
          <PaginationItem>
            <PaginationLink onClick={() => handleClick(1)} isActive={state.currentPage === 1}>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleClick(2)} isActive={state.currentPage === 2} >2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleClick(3)} isActive={state.currentPage === 3} >3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleClick(4)} isActive={state.currentPage === 4}>4</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => handleClick(5)} isActive={state.currentPage === 5}>5</PaginationLink>
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
