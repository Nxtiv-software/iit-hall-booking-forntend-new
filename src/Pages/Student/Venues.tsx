import { AppSidebar } from "@/components/app-sidebar-student"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { fetchAllVenues } from "@/Services/Venues"
import IITLoader from "@/components/IITLoader"
import { auth } from "@/Firebase/config"
import { useQuery } from "@tanstack/react-query"

const StudentVenues = () => {
  // Fetch all venues
  const { data: venueData = [], isLoading: venueLoading } = useQuery({
    queryKey: ["venues"],
    queryFn: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");
  
        const idToken = await currentUser.getIdToken();
        return fetchAllVenues(idToken);
      },
      retry: false, 
      retryOnMount: false,
  });

  if ( venueLoading ) {
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
                <BreadcrumbPage>Venues</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Venues</h2>
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Building</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Floor Number</TableHead>
                    <TableHead>Academic Capacity</TableHead>
                    <TableHead>Examination Capacity</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {venueData.map((venues) => (
                  <TableRow key={venues.id}>
                    <TableCell>{venues.name}</TableCell>
                    <TableCell>{venues.building?.name}</TableCell>
                    <TableCell>{venues.isAvailable ? "Available" : "Unavailable"}</TableCell>
                    <TableCell>{venues.floorNumber}</TableCell>
                    <TableCell>{venues.capacityAcademic}</TableCell>
                    <TableCell>{venues.capacityExamination}</TableCell>
                    <TableCell>{new Date(venues.createdAt).toLocaleString()}</TableCell>
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

export default StudentVenues
