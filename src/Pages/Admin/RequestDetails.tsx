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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminProfile,
  approveRequest,
  rejectRequest,
  fetchRequestById,
} from "@/Services/Admin";
import {
  fetchApprovalsByRequest,
  fetchAttachmentsByRequest,
} from "@/Services/Requests";
import IITLoader from "@/components/IITLoader";
import { auth } from "@/Firebase/config";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  User,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RequestDetails = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const adminLevel = adminData?.admin?.adminLevel;

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

  const hasCurrentLevelResponded = approvalHistory.some(
    (a) =>
      Number(a.adminLevel) === Number(adminLevel) &&
      ["APPROVED", "REJECTED"].includes(a.status?.name)
  );

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return approveRequest(adminId, requestId!, comment, idToken);
    },
    onSuccess: () => {
      toast.success("Request approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      navigate(`/admin${adminData.admin.adminLevel}-requests-pending`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to approve request");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return rejectRequest(adminId, requestId!, comment, idToken);
    },
    onSuccess: () => {
      toast.success("Request rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      navigate(`/admin${adminData.admin.adminLevel}-requests-pending`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to reject request");
    },
  });

  const handleApprove = () => {
    if (!comment.trim()) {
      toast.error("Please add a comment before approving");
      return;
    }
    setIsSubmitting(true);
    approveMutation.mutate();
  };

  const handleReject = () => {
    if (!comment.trim()) {
      toast.error("Please add a comment before rejecting");
      return;
    }
    setIsSubmitting(true);
    rejectMutation.mutate();
  };

  const SidebarComponent = {
    "1": AppSidebar1,
    "2": AppSidebar2,
    "3": AppSidebar3,
    "4": AppSidebar4,
  }[adminData?.admin?.adminLevel || "1"];

  useEffect(() => {
    console.log("Request Data:", requestData);
    console.log("Approval Data:", approvalHistory);
  }, [requestData, approvalHistory]);


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
                            Preferd Room
                          </p>
                          <p className="font-medium">
                            {requestData?.request.formData?.form3?.preferredroom || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Alternate Room
                          </p>
                          <p className="font-medium">
                            {requestData?.request.formData?.form3?.alternateroom || "N/A"}
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
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="font-medium">{requestData?.request.formData?.form1?.description || "No description provided"}</p>
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
                            Booking Date
                          </p>
                          <p className="font-medium">
                            {requestData?.request.formData?.form2?.datevalue}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested Date
                        </p>
                        <p className="font-medium">
                          {new Date(requestData?.request.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Starting time
                        </p>
                        <p className="font-medium">
                          {requestData?.request.formData?.form2?.startingTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Ending Time
                        </p>
                        <p className="font-medium">
                          {requestData?.request.formData?.form2?.endingTime}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        No of Days
                      </p>
                      <p className="font-medium">
                        {requestData?.request.formData?.form2?.noofdays}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Description
                      </p>
                      <p className="font-medium">
                        {requestData?.request.description || "No description provided"}
                      </p>
                    </div>

                    {/* Equipment and Services (Form 4) */}
                    {requestData?.request.formData?.form4 && (
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Equipment & Services Required
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request.formData?.form4?.soundSystem ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.soundSystem && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">Sound System</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request.formData?.form4?.projector ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.projector && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">Projector</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request.formData?.form4?.podium ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.podium && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">Podium</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request.formData?.form4?.tablesChairSetup ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.tablesChairSetup && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">
                              Tables & Chair Setup
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request.formData?.form4?.wifiCredentials ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.wifiCredentials && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">WiFi Credentials</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request?.formData?.form4?.iitBranding ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.iitBranding && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">IIT Branding</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded border ${requestData?.request?.formData?.form4?.zoomPackage ? "bg-primary border-primary" : "border-muted-foreground"}`}
                            >
                              {requestData?.request.formData?.form4?.zoomPackage && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">Zoom Package</span>
                          </div>
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

                {/* Action Section */}
                {requestData?.request.status?.name === "PENDING" && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Review Action</CardTitle>
                      <CardDescription>
                        Add your comments and approve or reject this request
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hasCurrentLevelResponded && (
                        <p className="text-sm italic text-muted-foreground">
                          This request has already been reviewed by your admin level.
                        </p>
                      )}

                      <Label>Comment *</Label>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="destructive"
                          disabled={hasCurrentLevelResponded}
                          onClick={() => rejectMutation.mutate()}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>

                        <Button
                          disabled={hasCurrentLevelResponded}
                          onClick={() => approveMutation.mutate()}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
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

export default RequestDetails;
