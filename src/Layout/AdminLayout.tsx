import { AppSidebar } from "@/components/app-sidebar-admin"
import Theme from "@/components/Theme"
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
import { fetchAdminProfile, fetchPendingRequestCount } from "@/Services/Admin"
import { fetchTotalBookingCount, fetchUpcomingWeekBookings } from "@/Services/Bookings"
import { fetchTotalStudentCount } from "@/Services/students"

const AdminLayout = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch the admin details
  const { data: adminData } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: () => fetchAdminProfile(token!), 
  });

  const adminId = adminData?.admin?.id;

  // Fetch pending requests of the admin
  const { data: pendingCountData, isLoading: pendingLoading } = useQuery({
    queryKey: ["pendingCount", adminId],
    queryFn: () => fetchPendingRequestCount(adminId!, token!), 
    enabled: !!adminId && !!token, 
  });

  // Fetch total booking count
  const { data: bookingCountData, isLoading: bookingLoading } = useQuery({
    queryKey: ["totalBookings"],
    queryFn: () => fetchTotalBookingCount(token!),
    enabled: !!token,
  });

  // Fetch total student count
  const { data: studentCountData, isLoading: studentLoading } = useQuery({
    queryKey: ["totalStudents"],
    queryFn: () => fetchTotalStudentCount(token!),
    enabled: !!token,
  });

  // Fetch upcoming events
  const { data: upcomingEventData, isLoading: upcomingEventLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: () => fetchUpcomingWeekBookings(token!),
    enabled: !!token,
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl">
              Pending Requests: {pendingLoading ? "Loading..." : pendingCountData?.totalPending ?? 0}
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl">
              Total Bookings: {bookingLoading ? "Loading..." : bookingCountData?.totalPending ?? 0}
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl">
              Total Students: {studentLoading ? "Loading..." : studentCountData?.totalPending ?? 0}
            </div>
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <h2 className="text-lg font-semibold mb-2">Upcoming Events:</h2>
            {upcomingEventLoading ? (
              <p>Loading...</p>
            ) : upcomingEventData && upcomingEventData.length > 0 ? (
              <ul className="space-y-2">
                {upcomingEventData.map((booking: any) => (
                  <li
                    key={booking.id}
                    className="p-2 border rounded-md bg-white/50 flex flex-col md:flex-row md:justify-between md:items-center"
                  >
                    <div>
                      <p><strong>Student:</strong> {booking.request.student.user.name}</p>
                      <p><strong>Venue:</strong> {booking.request.venue.name}</p>
                      <p><strong>Date:</strong> {new Date(booking.request.requiredDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <p><strong>Admin:</strong> {booking.admin.user.name}</p>
                      <p><strong>Status:</strong> {booking.request.status.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming events this week.</p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
