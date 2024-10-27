import { User } from "@/hooks/useLogin";
import { createContext } from "react";

interface AuthContext {
  isLoggedIn: boolean;
  authUser: User;
  setAuthUser: (user: User) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void; // Accept a token parameter
}

export const AuthContext = createContext<AuthContext>({
  isLoggedIn: false,
  authUser: {id:"", email: "", username: "" },
  setAuthUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
});
