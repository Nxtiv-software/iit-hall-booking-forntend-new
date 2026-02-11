import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { AdminProtected, SuperAdminProtected, UserProtected } from "./Pages/Auth/ProtectedRoutes";
import StudentLayout from "./Layout/StudentLayout";
import BookingLayout from "./Layout/BookingLayout";
import Admin1Layout from "./Layout/Admin1Layout";
import Admin2Layout from "./Layout/Admin2Layout";
import Admin3Layout from "./Layout/Admin3Layout";
import Admin4Layout from "./Layout/Admin4Layout";
import { AuthProvider } from "./AuthProvider/FirebaseProvider/AuthProvider";
import { BookingProvider } from "./AuthProvider/BookingProvider";
import SignIn from "./Pages/AuthPages/SignIn";
import PasswordReset from "./Pages/Auth/Firebase-Auth/passwordReset";
import Admin1PendingRequests from "./Pages/Admin/Admin1/PendingRequests";
import Admin2PendingRequests from "./Pages/Admin/Admin2/PendingRequests";
import Admin3PendingRequests from "./Pages/Admin/Admin3/PendingRequests";
import Admin4RejectedRequests from "./Pages/Admin/Admin4/RejectedRequests";
import Admin1RejectedRequests from "./Pages/Admin/Admin1/RejectedRequests";
import Admin2RejectedRequests from "./Pages/Admin/Admin2/RejectedRequests";
import Admin3RejectedRequests from "./Pages/Admin/Admin3/RejectedRequests";
import Admin4PendingRequests from "./Pages/Admin/Admin4/PendingRequests";
import AdminBookings from "./Pages/Admin/Bookings";
import AdminResources from "./Pages/Admin/Resources";
import AdminVenues from "./Pages/Admin/Venues";
import AdminSettings from "./Pages/Admin/Settings";
import StudentVenues from "./Pages/Student/Venues";
import StudentBookings from "./Pages/Student/Bookings";
import StudentSettings from "./Pages/Student/Settings";
import RequestDetails from "./Pages/Admin/RequestDetails";
import AdminViewRequestDetails from "./Pages/Admin/ViewRequestDetails";
import StudentViewRequestDetails from "./Pages/Student/ViewRequestDetails";
import StudentPendingRequests from "./Pages/Student/PendingRequests";
import StudentRejectedRequests from "./Pages/Student/RejectedRequests";
import CreateAdmin from "./Pages/SuperAdmin/CreateAdmin";
import CreateStudent from "./Pages/SuperAdmin/CreateStudent";
import Admin5RejectedRequests from "./Pages/Admin/Admin5/RejectedRequests";
import Admin6RejectedRequests from "./Pages/Admin/Admin6/RejectedRequests";
import Admin5PendingRequests from "./Pages/Admin/Admin5/PendingRequests";
import Admin6PendingRequests from "./Pages/Admin/Admin6/PendingRequests";
import Admin5Layout from "./Layout/Admin5Layout";
import Admin6Layout from "./Layout/Admin6Layout";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
        <AuthProvider>
          <BookingProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignIn />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/reset-password" element={<PasswordReset />} />

            {/* SuperAdmin routes */}
            {/* <Route path="super-admin-dashboard" element={<SuperAdminProtected>
              <SuperAdminLayout/>
            </SuperAdminProtected>}/> */}

            <Route path="super-admin-create-admin" element={<SuperAdminProtected>
              <CreateAdmin/>
            </SuperAdminProtected>}/>

            <Route path="super-admin-create-student" element={<SuperAdminProtected>
              <CreateStudent/>
            </SuperAdminProtected>}/>

            {/* Admin routes */}
            <Route
              path="/admin1-dashboard"
              element={
                <AdminProtected>
                  <Admin1Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin2-dashboard"
              element={
                <AdminProtected>
                  <Admin2Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin3-dashboard"
              element={
                <AdminProtected>
                  <Admin3Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin4-dashboard"
              element={
                <AdminProtected>
                  <Admin4Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin5-dashboard"
              element={
                <AdminProtected>
                  <Admin5Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin6-dashboard"
              element={
                <AdminProtected>
                  <Admin6Layout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin1-requests-pending"
              element={
                <AdminProtected>
                  <Admin1PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin2-requests-pending"
              element={
                <AdminProtected>
                  <Admin2PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin3-requests-pending"
              element={
                <AdminProtected>
                  <Admin3PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin4-requests-pending"
              element={
                <AdminProtected>
                  <Admin4PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin5-requests-pending"
              element={
                <AdminProtected>
                  <Admin5PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin6-requests-pending"
              element={
                <AdminProtected>
                  <Admin6PendingRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-request-details/:requestId"
              element={
                <AdminProtected>
                  <RequestDetails />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-view-request-details/:requestId"
              element={
                <AdminProtected>
                  <AdminViewRequestDetails />
                </AdminProtected>
              }
            />
            <Route
              path="/admin1-requests-rejected"
              element={
                <AdminProtected>
                  <Admin1RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin2-requests-rejected"
              element={
                <AdminProtected>
                  <Admin2RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin3-requests-rejected"
              element={
                <AdminProtected>
                  <Admin3RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin4-requests-rejected"
              element={
                <AdminProtected>
                  <Admin4RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin5-requests-rejected"
              element={
                <AdminProtected>
                  <Admin5RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin6-requests-rejected"
              element={
                <AdminProtected>
                  <Admin6RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-bookings"
              element={
                <AdminProtected>
                  <AdminBookings />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-resources"
              element={
                <AdminProtected>
                  <AdminResources />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-venues"
              element={
                <AdminProtected>
                  <AdminVenues />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-settings"
              element={
                <AdminProtected>
                  <AdminSettings />
                </AdminProtected>
              }
            />

            {/* Student routes */}
            <Route
              path="/student-dashboard"
              element={
                <UserProtected>
                  <StudentLayout />
                </UserProtected>
              }
            >
            
            </Route>
            <Route
              path="/student-add-booking"
              element={
                <UserProtected>
                  <BookingLayout/>
                </UserProtected>
              }
            />
            <Route
              path="/student-bookings"
              element={
                <UserProtected>
                  <StudentBookings/>
                </UserProtected>
              }
            />
            <Route
              path="/student-venues"
              element={
                <UserProtected>
                  <StudentVenues/>
                </UserProtected>
              }
            />
            <Route
              path="/student-settings"
              element={
                <UserProtected>
                  <StudentSettings/>
                </UserProtected>
              }
            />
            <Route
              path="/student-pending-requests"
              element={
                <UserProtected>
                  <StudentPendingRequests/>
                </UserProtected>
              }
            />
            <Route
              path="/student-rejected-requests"
              element={
                <UserProtected>
                  <StudentRejectedRequests/>
                </UserProtected>
              }
            />
            <Route
              path="/student-view-request-details/:requestId"
              element={
                <UserProtected>
                  <StudentViewRequestDetails />
                </UserProtected>
              }
            />

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "14px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              },
              success: {
                style: {
                  background: "#10B981",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#10B981",
                },
              },
              error: {
                style: {
                  background: "#EF4444",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#EF4444",
                },
              },
            }}
          />
          <SonnerToaster richColors position="top-center"/>
          </BookingProvider>
        </AuthProvider>
       
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
