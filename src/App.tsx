import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../src/Pages/Auth/Login";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { AdminProtected, UserProtected } from "./Pages/Auth/ProtectedRoutes";
import StudentLayout from "./Layout/StudentLayout";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            />

            <Route
              path="/dashboard"
              element={
                <UserProtected>
                  <StudentLayout />
                </UserProtected>
              }
            />
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
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
