import { useBooking } from "@/AuthProvider/BookingProvider";
import BookingForm1 from "@/components/BookingForm/BookingForm1";
import BookingForm2 from "@/components/BookingForm/BookingForm2";
import BookingForm3 from "@/components/BookingForm/BookingForm3";
import BookingForm4 from "@/components/BookingForm/BookingForm4";
import BookingForm5 from "@/components/BookingForm/BookingForm5";
import PaginationNav from "@/components/PaginationNav";
import Theme from "@/components/Theme";
import { AppSidebar } from "@/components/app-sidebar-student";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/student-dashboard": { label: "Dashboard" },
  "/student-add-booking": { label: "Add a Booking", parent: "/student-dashboard" },
  "/student-bookings": { label: "Bookings", parent: "/student-dashboard" },
  // Add more routes as needed
};

const BookingLayout = () => {
  const { state } = useBooking();
  const location = useLocation();

  const getBreadCrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: { label: string; isLast: boolean }[] = [];

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      const config = breadcrumbMap[currentPath];

      if (config) {
        breadcrumbs.push({
          label: config.label,
          isLast: index === pathSegments.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadCrumbs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item) => (
                <BreadcrumbItem key={item.label}>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  {!item.isLast && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme />
          </div>
        </header>
        <div className="flex flex-col gap-8 min-h-[90vh] pb-10 mt-10 overflow-y-auto">
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
                <BookingForm5 />
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BookingLayout;
