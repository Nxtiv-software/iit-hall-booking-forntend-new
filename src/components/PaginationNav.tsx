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
            <PaginationLink isActive onClick={handleClick} href="#">1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick} href="#">2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick} href="#">3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick} href="#">4</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={handleClick} href="#">5</PaginationLink>
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
