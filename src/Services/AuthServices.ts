import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/config";
import axios from "axios";

const BASE_URL = "http://localhost:8800/auth"; 

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  const response = await axios.post(`${BASE_URL}/login`, { idToken });
  return response.data.user; 
};

export const signupUser = async (email: string, password: string, roleId: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  const response = await axios.post(`${BASE_URL}/register`, { idToken, roleId });
  return response.data.user;
};
