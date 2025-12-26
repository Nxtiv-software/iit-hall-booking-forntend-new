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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useQuery } from "@tanstack/react-query"
import { fetchAdminProfile, fetchPendingRequestCount } from "@/Services/Admin"
import { fetchTotalBookingCount, fetchUpcomingWeekBookings } from "@/Services/Bookings"
import { fetchTotalStudentCount } from "@/Services/Students"

const AdminLayout = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch the admin details
  const { data: adminData } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: () => fetchAdminProfile(token!), 
  });

  const adminId = adminData?.admin?.id;
  const username = adminData?.admin?.user?.username;

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
  const { data: upcomingEventData = [] } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: () => fetchUpcomingWeekBookings(token!),
    enabled: !!token,
  });

  //Helper function to create the date format
  const formatDate = (date: Date) => {
    const day = date.getDate()

    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"]
      const v = n % 100
      return s[(v - 20) % 10] || s[v] || s[0]
    }

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
    const month = date.toLocaleDateString("en-US", { month: "long" })

    return `${weekday}, ${day}${getOrdinal(day)} of ${month}`
  }


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
          <div className="bg-muted/50 rounded-xl">
            <div></div>
            <Card className="@container/card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                  {`Hey, welcome back ${username ? username.charAt(0).toUpperCase() + username.slice(1) : "User"}`}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Pending Requests</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {pendingLoading ? "Loading..." : pendingCountData?.totalPendings ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Total Bookings</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {bookingLoading ? "Loading..." : bookingCountData?.totalBookings ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl"> 
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Total Students</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {studentLoading ? "Loading..." : studentCountData?.totalStudents ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
              <CardDescription>Events happening within the upcoming week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
              <ul className="space-y-2">
                {upcomingEventData.map((booking, index) => (
                  <li
                    key={booking.id}
                    className="flex items-start gap-3"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-md border-2 font-semibold translate-y-1">
                      {index + 1}
                    </span>

                    <div className="flex-1 p-4 border rounded-md bg-muted/50 flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="space-y-1">
                        <p>Student: {booking.request.student.user.username}</p>
                        <p>Venue: {booking.request.venue.name}</p>
                        <p>Date: {new Date(booking.request.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="mt-2 md:mt-0 space-y-1">
                        <p>Admin: {booking.admin.user.name}</p>
                        <p>Status: {booking.request.status.name}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
