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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { fetchAllBookings } from "@/Services/Bookings"
import Theme from "@/components/Theme"
import IITLoader from "@/components/IITLoader"
import { auth } from "@/Firebase/config"
import { AppSidebar } from "@/components/app-sidebar-student"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const StudentBookings = () => {
  const navigate = useNavigate();
  // Fetch all bookings
  const { data: bookingsData = [], isLoading } = useQuery({
      queryKey: ["bookings"],
      queryFn: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");
  
        const idToken = await currentUser.getIdToken();
        return fetchAllBookings(idToken);
      },
      retry: false, 
      retryOnMount: false,
    });

  if (isLoading) {
    return <IITLoader/>
  }

  return (
    <SidebarProvider>
      <AppSidebar/>
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
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
              <h2 className="text-lg font-semibold mb-4">Bookings</h2>
              <Table>
                  {/* <TableCaption>List of bookings</TableCaption> */}
                  <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Requested Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {bookingsData.map((bookings) => (
                      <TableRow key={bookings.id}>
                      <TableCell>{bookings.request.student.user.username}</TableCell>
                      <TableCell>{bookings.request.venue.name}</TableCell>
                      <TableCell>{bookings.request.status.name}</TableCell>
                      <TableCell>{bookings.admin.user.username}</TableCell>
                      <TableCell>{new Date(bookings.request.requiredDate).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button onClick={() => navigate(`/student-view-request-details/${bookings.request.id}`)}>
                            See more
                        </Button>
                      </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default StudentBookings
