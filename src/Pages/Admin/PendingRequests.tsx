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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { fetchPendingRequests, fetchAdminProfile } from "@/Services/Admin"
import IITLoader from "@/components/IITLoader"
import { auth } from "@/Firebase/config"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

// Type definition for pending request
interface PendingRequest {
  id: string;
  student?: {
    name: string;
  };
  venue: {
    name: string;
  };
  status: {
    name: string;
  };
  createdAt: string;
}

const PendingRequests = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token)

  // Fetch the admin details
  const { data: adminData, isLoading: adminLoading  } = useQuery({
  queryKey: ["adminProfile"],
  queryFn: () => fetchAdminProfile(token!), 
  });
  
  const adminId = adminData?.admin?.id;

  // Fetch pending requests
  const { data: pendingRequestData = [], isLoading: requestLoading } = useQuery<PendingRequest[]>({
    queryKey: ["pendingRequests", adminId],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchPendingRequests(adminId, idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  if (requestLoading || adminLoading) {
    return <IITLoader/>
  }

  return (
    <div>
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
                <BreadcrumbPage>Pending Requests</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
              <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
              <Table className="">
                  <TableCaption>List of pending booking requests</TableCaption>
                  <TableHeader>
                  <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested Date</TableHead>
                      <TableHead>Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody className="">
                  {pendingRequestData.map((request) => (
                      <TableRow className="pt-20" key={request.id}>
                      <TableCell>{request.student?.name || 'N/A'}</TableCell>
                      <TableCell>{request.venue.name}</TableCell>
                      <TableCell>{request.status.name}</TableCell>
                      <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/admin-requests-pending/${request.id}`)}
                        >
                          See More
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
</div>
  )
}

export default PendingRequests