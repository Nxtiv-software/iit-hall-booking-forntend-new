import { useContext, useEffect, useReducer } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "login/success":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [{ user, token, loading, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

   const navigate = useNavigate();

  function loginUser(userDetails) {
    dispatch({ type: "loading" });
    localStorage.setItem("token", userDetails.token);
    localStorage.setItem("user", JSON.stringify(userDetails.user));

    console.log("User Details :", userDetails);
    dispatch({
      type: "login/success",
      payload: {
        user: userDetails.user,
        token: userDetails.token,
      },
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
    navigate("/login", { replace: true });
  }

  const isAdmin = () => {
    console.log("isAdmin check - user:", user);
    if (user == null || !user || user == undefined) {
      console.log("isAdmin: false (no user)");
      return false;
    }
    const adminStatus = user.role?.name === "ADMIN";
    console.log("isAdmin:", adminStatus, "role:", user.role);
    return adminStatus;
  };

  useEffect(() => {
    const initializeAuth = () => {
      console.log("Intializing Auth");

      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("user");
      
      // Only restore auth state if both token and user data exist
      if (token && userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          dispatch({
            type: "login/success",
            payload: {
              user: userData,
              token: token,
            },
          });
        } catch (error) {
          console.error("Failed to parse user data:", error);
          // Clear invalid data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({ type: "logout" });
        }
      } else {
        // No valid auth data, ensure logged out state
        dispatch({ type: "logout" });
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
