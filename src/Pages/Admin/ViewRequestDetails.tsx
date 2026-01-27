import { AppSidebar1 } from "@/components/app-sidebar-admin-1";
import { AppSidebar2 } from "@/components/app-sidebar-admin-2";
import { AppSidebar3 } from "@/components/app-sidebar-admin-3";
import { AppSidebar4 } from "@/components/app-sidebar-admin-4";
import Theme from "@/components/Theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminProfile,
  fetchRequestById,
} from "@/Services/Admin";
import {
  fetchApprovalsByRequest,
  fetchAttachmentsByRequest,
} from "@/Services/Requests";
import IITLoader from "@/components/IITLoader";
import { auth } from "@/Firebase/config";
import { useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { fetchAllResources } from "@/Services/Resources";
import { fetchVenue } from "@/Services/Venues";
import { useEffect, useState } from "react";

const AdminViewRequestDetails = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const [preferredVenue, setPreferredVenue] = useState<any | null>(null);
  const [alternateVenue, setAlternateVenue] = useState<any | null>(null);

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

  // Fetch specific request details
  const { data:requestData, isLoading: requestLoading } = useQuery({
    queryKey: ["request", requestId],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchRequestById(adminId, requestId!, idToken);
    },
    enabled: !!adminId,
    retry: false,
  });

  // Fetch approval history
  const { data: approvalHistory = [] } = useQuery({
    queryKey: ["approvals", requestId],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchApprovalsByRequest(requestId!, idToken);
    },
    enabled: !!requestId,
    retry: false,
  });

  // Fetch attachments
  const { data: attachments = [] } = useQuery({
    queryKey: ["attachments", requestId],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAttachmentsByRequest(requestId!, idToken);
    },
    enabled: !!requestId,
    retry: false,
  });

   // Fetch all resources
  const { data: allResources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAllResources(idToken);
    },
    retry: false,
  });


  const SidebarComponent = {
    "1": AppSidebar1,
    "2": AppSidebar2,
    "3": AppSidebar3,
    "4": AppSidebar4,
  }[adminData?.admin?.adminLevel || "1"];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
  
        const idToken = await currentUser.getIdToken();
  
        const preferredRoomId = requestData?.request.formData?.form3?.preferredroom;
        const alternateRoomId = requestData?.request.formData?.form3?.alternateroom;
  
        if (preferredRoomId) {
          const venue = await fetchVenue(preferredRoomId, idToken);
          setPreferredVenue(venue);
        }
  
        if (alternateRoomId) {
          const venue = await fetchVenue(alternateRoomId, idToken);
          setAlternateVenue(venue);
        }
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };
  
    if (requestData) fetchVenues();
  }, [requestData]);

  if (requestLoading || adminLoading || !requestData) {
    return <IITLoader />;
  }

  return (
    <div>
      <SidebarProvider>
        <SidebarComponent />
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
                  <BreadcrumbLink href="/admin-dashboard">Menu</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin${admin}-requests-pending">
                    Pending Requests
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Request Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <Theme />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Request Details</h2>
                <Badge
                  variant={
                    requestData?.request.status?.name === "PENDING"
                      ? "secondary"
                      : requestData?.request.status?.name === "APPROVED"
                        ? "default"
                        : "destructive"
                  }
                  className="text-sm"
                >
                  {requestData?.request.status?.name ?? "N/A"}
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                

                {/* Student Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Student Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">
                        {`${requestData?.request.student?.user?.firstName ?? ""} ${requestData?.request.student?.user?.lastName ?? ""}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">
                        {requestData?.request.student?.user?.uniEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Index Number
                      </p>
                      <p className="font-medium">
                        {requestData?.request.student?.iitIdNumber || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {requestData?.request.student?.user?.phoneNum || "N/A"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Venue Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Venue Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Venue Name
                          </p>
                          <p className="font-medium">{requestData?.request.venue?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Building
                          </p>
                          <p className="font-medium">
                            {requestData?.request?.venue?.building?.name || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Prefered Room
                          </p>
                          <p className="font-medium">
                            {preferredVenue?.name || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Alternate Room
                          </p>
                          <p className="font-medium">
                            {alternateVenue?.name || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            No of Participants
                          </p>
                          <p className="font-medium">
                            {requestData?.request?.attendance || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Details (Form 1) */}
                {requestData?.request?.formData?.form1 && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Event Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Event Title</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.eventtitle || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Event Type</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.eventtype || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Society Name</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.societyname || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ExCo Member Name</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.excomembername || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ExCo Position</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.excoposition || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Participants</p>
                          <p className="font-medium">{requestData?.request.formData?.form1?.participants || "N/A"}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Event Date</p>
                          <p className="font-medium">
                            {new Date(requestData?.request.requiredDate).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground"> Starting time </p>
                          <p className="font-medium">
                            {new Date(`1970-01-01T${requestData?.request.formData?.form2?.startingTime}`).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, 
                            }) || "N/A" }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground"> Ending Time </p>
                          <p className="font-medium">
                            {new Date(`1970-01-01T${requestData?.request.formData?.form2?.endingTime}`).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, 
                            }) || "N/A" }
                          </p>
                        </div>
                      </div>
                        <div>
                          <p className="text-sm text-muted-foreground"> No of Days </p>
                          <p className="font-medium"> {requestData?.request.formData?.form2?.noofdays} </p>
                        </div>
                    </CardContent>
                  </Card>
                )}

                {/* Booking Details */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Booked by
                          </p>
                          <p className="font-medium">
                            {requestData?.request?.student?.user?.firstName} {requestData?.request?.student?.user?.lastName}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested Date
                        </p>
                        <p className="font-medium">
                          {new Date(requestData?.request.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, 
                            })}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground"> Title </p>
                        <p className="font-medium"> {requestData?.request.title || "No title provided"} </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground"> Description </p>
                        <p className="font-medium"> {requestData?.request.description || "No description provided"} </p>
                      </div>
                    </div>

                    {/* Equipment and Services (Form 4) */}
                    {requestData?.request.formData?.form4 && (
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Equipment & Resources Required
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          {allResources.map((resource: any) => {
                            const isSelected = requestData?.request.formData?.form4?.resourceIds?.includes(resource.id);
                            return (
                              <div key={resource.id} className="flex items-center gap-2">
                                <div
                                  className={`h-4 w-4 rounded border ${isSelected ? "bg-green-500 border-green-500" : "border-muted-foreground"}`}
                                >
                                  {isSelected && (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <span className="text-sm">{resource.name}</span>
                              </div>
                            );
                          })}
                        </div>
                        {requestData?.request.formData?.form4?.additionalNotes && (
                          <div className="mt-3">
                            <p className="text-sm text-muted-foreground">
                              Additional Notes
                            </p>
                            <p className="font-medium text-sm">
                              {requestData?.request.formData?.form4?.additionalNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Approval History */}
                {approvalHistory && approvalHistory.length > 0 && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Approval History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {approvalHistory.map(
                          (
                            approval: {
                              adminLevel: string;
                              status: { name: "APPROVED" | "REJECTED" }
                              comment: string;
                              createdAt: string;
                            },
                            index: number,
                          ) => (
                            <div
                              key={index}
                              className="border-l-2 border-muted pl-4"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">
                                  {approval?.adminLevel}
                                </p>
                                <Badge
                                  variant={
                                    approval?.status?.name === "APPROVED"
                                      ? "default"
                                      : approval?.status?.name === "REJECTED"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {approval?.status?.name ?? "PENDING"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {approval?.comment}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(approval?.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Attachments */}
                {attachments && attachments.length > 0 && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Attachments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {attachments.map(
                          (attachment: {
                            id: string;
                            fileName: string;
                            fileType: string;
                            fileSize: string;
                            fileUrl: string;
                          }) => (
                            <div
                              key={attachment?.id}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">
                                  {attachment?.fileName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment?.fileType} • {attachment?.fileSize}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={attachment?.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View
                                </a>
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminViewRequestDetails;
