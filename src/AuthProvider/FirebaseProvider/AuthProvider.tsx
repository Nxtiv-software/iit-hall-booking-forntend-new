import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/config.ts";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (!fbUser) {
        console.log(fbUser);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const idToken = await fbUser.getIdToken();
        console.log(idToken);
        console.log(idToken)
        const response = await axios.get("http://localhost:8800/users/me", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setUser(response.data.user);
        console.log("################", response.data.user, "#############");
        console.log("ffffffff", user,"ffffffffffffff")

      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Checks whether authenticated
  const isAuthenticated = () => !!firebaseUser;

  // Login with Firebase
  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isAdmin = () => {
    if (!user) return false;
    return user?.role?.name === "ADMIN";
  };

  const isSuperAdmin = () => {
    if (!user) return false;
    return user?.role?.name === "SUPER_ADMIN";
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout, isAdmin, isSuperAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
