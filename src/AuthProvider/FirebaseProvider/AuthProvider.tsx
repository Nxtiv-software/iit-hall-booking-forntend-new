import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/config.ts";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.log(firebaseUser);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        console.log(idToken);
        const response = await axios.get("http://localhost:8800/users/me", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
    return user?.role?.name === "ADMIN";
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout, isAdmin, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
