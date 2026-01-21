import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import IITLoader from "@/components/IITLoader";
import { fetchRequestById } from "@/Services/Requests";

const RequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: request, isLoading, error } = useQuery({
    queryKey: ["request", requestId],
    queryFn: () => fetchRequestById(requestId!, token!),
    enabled: !!requestId && !!token,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <IITLoader />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">Failed to load request details</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Request Details</h1>
          <p className="text-muted-foreground">
            Request ID: {request.id}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to List
        </Button>
      </div>

      <Separator />

      {/* Status Badge */}
      <div className="flex gap-2">
        <Badge variant={
          request.status?.name === "PENDING" ? "secondary" :
          request.status?.name === "APPROVED" ? "default" :
          "destructive"
        }>
          {request.status?.name || "Unknown"}
        </Badge>
      </div>

      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Details about the requesting student</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
            <p className="text-lg">
              {request.student?.user?.firstName} {request.student?.user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{request.student?.user?.uniEmail}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Username</p>
            <p className="text-lg">{request.student?.user?.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
            <p className="text-lg">{request.student?.user?.phoneNum || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>Event and venue information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Venue</p>
              <p className="text-lg font-semibold">{request.venue?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Building</p>
              <p className="text-lg">{request.venue?.building?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Requested Date</p>
              <p className="text-lg">
                {new Date(request.requiredDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Request Submitted</p>
              <p className="text-lg">
                {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {request.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
              <p className="text-base p-4 bg-muted rounded-md">{request.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Information (if available) */}
      {request.eventName && (
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Event Name</p>
              <p className="text-lg">{request.eventName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Event Type</p>
              <p className="text-lg">{request.eventType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expected Participants</p>
              <p className="text-lg">{request.participants || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {request.status?.name === "PENDING" && (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Approve or reject this request</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => {
                // Handle approve
                console.log("Approve request:", requestId);
              }}
            >
              Approve Request
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => {
                // Handle reject
                console.log("Reject request:", requestId);
              }}
            >
              Reject Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RequestDetails;
