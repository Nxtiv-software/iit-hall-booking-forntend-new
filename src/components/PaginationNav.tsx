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

  const {currentPage} = useBooking()

  const handleClick = () => {

  }
  return (
  
      <Pagination>
        <PaginationContent>

          {/* <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem> */}

<div className="flex gap-5">
          <PaginationItem>
            <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive={currentPage === 2} >2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick} >3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick}>4</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick}>5</PaginationLink>
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
