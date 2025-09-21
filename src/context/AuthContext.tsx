import { JwtPayload, jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "../utils/cookieUtils";
import { COOKIE_NAMES } from "../constants/cookies";

interface UserData {
  email: string;
  role: string;
}

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export type AuthContextType = {
  user: UserData | null;
  setUser: (token: string) => void;
  removeUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

function tokenToUser(token: string): UserData | null {
  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.sub && decoded.role) {
      return { email: decoded.sub, role: decoded.role };
    }
  }
  return null;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  function getCurrentUser(): UserData | null {
    const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    return token ? tokenToUser(token) : null;
  }

  const [user, setUser] = useState<UserData | null>(getCurrentUser());

  const setCurrentUser = (token: string) => {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.sub && decoded.role) {
      setUser({ email: decoded.sub, role: decoded.role });
      console.log(`User is set ${JSON.stringify(decoded)}`);
    }
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, token);
  };

  const removeUser = () => {
    console.log("User is unset");
    deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setCurrentUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
