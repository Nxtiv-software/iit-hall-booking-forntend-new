import { AppSidebar2 } from "@/components/app-sidebar-admin-2"
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
import { fetchAdmin2Rejected, fetchAdminProfile } from "@/Services/Admin"
import IITLoader from "@/components/IITLoader"
import { auth } from "@/Firebase/config"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Admin2RejectedRequests = () => {
    const navigate = useNavigate();
    // Fetch admin profile
    const { data: adminData, isLoading: adminLoading } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("Not authenticated");

            const idToken = await currentUser.getIdToken();
            return fetchAdminProfile(idToken);
        },
        retry: false, 
        retryOnMount: false,
    });

    const adminId = adminData?.admin?.id;

    // Fetch rejected requests
    const { data: rejectedRequestData = [], isLoading: requestLoading } = useQuery({
        queryKey: ["rejectedRequests", adminId],
        queryFn: async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("Not authenticated");

            const idToken = await currentUser.getIdToken();
            return fetchAdmin2Rejected(adminId, idToken);
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
        <AppSidebar2 />
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
                    <BreadcrumbPage>Rejected Requests</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
                <Theme/>
            </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
                    <h2 className="text-lg font-semibold mb-4">Rejected Requests</h2>
                    <Table>
                        {/* <TableCaption>List of rejected booking requests</TableCaption> */}
                        <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Requested Date</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {rejectedRequestData.map((request) => (
                            <TableRow key={request.id}>
                            <TableCell>{`${request.student.user.firstName ?? ""} ${request.student.user.lastName ?? ""}`}</TableCell>
                            <TableCell>{request.venue.name}</TableCell>
                            <TableCell>{request.status.name}</TableCell>
                            <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/admin-view-request-details/${request.id}`)}>
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
    </div>
  )
}

export default Admin2RejectedRequests