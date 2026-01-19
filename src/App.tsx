import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../src/Pages/Auth/Firebase-Auth/Login";
import { AuthProvider } from "./AuthProvider/FirebaseProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { AdminProtected, UserProtected } from "./Pages/Auth/ProtectedRoutes";
import StudentLayout from "./Layout/StudentLayout";
import AdminLayout from "./Layout/AdminLayout";
import BookingLayout from "./Layout/BookingLayout";


import Bookings from "./Pages/Admin/Bookings";
import Resources from "./Pages/Admin/Resources";
import Venues from "./Pages/Admin/Venues";
import { BookingProvider } from "./AuthProvider/BookingProvider";
import PendingRequests from "./Pages/Admin/PendingRequests";
// import AcceptedRequests from "./Pages/Admin/AcceptedRequests";
import RejectedRequests from "./Pages/Admin/RejectedRequests";
import Settings from "./Pages/Admin/Settings";
import Signup from "./Pages/Auth/Firebase-Auth/Signup";
import AdminQuestions from "./Pages/Auth/Firebase-Auth/AdminQuestions";
import StudentQuestions from "./Pages/Auth/Firebase-Auth/StudentQuestions";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
        <AuthProvider>
          <BookingProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-questions" element={<AdminQuestions />} />
            <Route path="/student-questions" element={<StudentQuestions />} />
            {/* Admin routes */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtected>
                  <AdminLayout />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-requests-pending"
              element={
                <AdminProtected>
                  <PendingRequests />
                </AdminProtected>
              }
            />
            {/* <Route
              path="/admin-requests-accepted"
              element={
                <AdminProtected>
                  <AcceptedRequests />
                </AdminProtected>
              }
            /> */}
            <Route
              path="/admin-requests-rejected"
              element={
                <AdminProtected>
                  <RejectedRequests />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-bookings"
              element={
                <AdminProtected>
                  <Bookings />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-resources"
              element={
                <AdminProtected>
                  <Resources />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-venues"
              element={
                <AdminProtected>
                  <Venues />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-settings"
              element={
                <UserProtected>
                  <Settings/>
                </UserProtected>
              }
            />

            {/* Student routes */}
            <Route
              path="/dashboard"
              element={
                <UserProtected>
                  <StudentLayout />
                </UserProtected>
              }
            >
            <Route
              path="booking"
              element={
                <UserProtected>
                  <BookingLayout/>
                </UserProtected>
              }
            />
            </Route>

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
