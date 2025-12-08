import React from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";

const AdminDashboard = () => {
  const { logout } = useAuth();

  
  return (
    <div>
      Admin
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
