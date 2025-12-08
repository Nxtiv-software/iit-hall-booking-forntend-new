import { LoaderIcon } from "react-hot-toast";
import { useAuth } from "../../AuthProvider/AuthProvider";
import Unauthorized from "../Unauthorized";
import { Navigate } from "react-router-dom";

export function AdminProtected({ children }) {
  const { isAuthenticated, loading, isAdmin, user } = useAuth();

  console.log("AdminProtected - loading:", loading, "isAuthenticated:", isAuthenticated, "isAdmin:", isAdmin(), "user:", user);

  if (loading) {
    return <LoaderIcon />;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated - redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    console.log("User is not admin - showing Unauthorized page");
    return <Unauthorized />;
  }

  return children;
}

export function UserProtected({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoaderIcon />;
  }

  if (!isAuthenticated) {
    console.log("UnAuthroized");
    return <Navigate to="/login" replace />;
  }

  return children;
}
