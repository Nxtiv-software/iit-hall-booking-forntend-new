import { AppSidebar } from "@/components/app-sidebar-admin"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { fetchAllBookings } from "@/Services/Bookings"
import toast from "react-hot-toast"
import Theme from "@/components/Theme"

const Bookings = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchAllBookings(token!),
    onError: () => {
      toast.error("Failed to fetch bookings. Please try again.");
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Menu
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Bookings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-4">
              {isLoading && <p>Loading bookings...</p>}

              {error && <p className="text-red-500">Failed to load bookings</p>}

              {!isLoading && bookings && bookings.length === 0 && (
                <p>No bookings found.</p>
              )}

              {!isLoading && bookings && bookings.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {bookings.map((booking: any) => (
                    <div
                      key={booking.id}
                      className="bg-white p-4 rounded-xl shadow border border-gray-200"
                    >
                      <p>
                        <strong>Student:</strong>{" "}
                        {booking.request.student.user.name}
                      </p>
                      <p>
                        <strong>Venue:</strong> {booking.request.venue.name}
                      </p>
                      <p>
                        <strong>Status:</strong> {booking.request.status.name}
                      </p>
                      <p>
                        <strong>Admin:</strong> {booking.admin.user.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Bookings
