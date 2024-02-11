import { JwtPayload, jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useState } from "react";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie] = useCookies(["jwt-auth"]);
  function getCurrentUser(): UserData | null {
    const token = cookies["jwt-auth"];
    return tokenToUser(token);
  }

  const [user, setUser] = useState<UserData | null>(getCurrentUser());

  const setCurrentUser = (token: string) => {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.sub && decoded.role) {
      setUser({ email: decoded.sub, role: decoded.role });
      console.log(`User is set ${JSON.stringify(decoded)}`);
    }
    setCookie("jwt-auth", token);
  };

  const removeUser = () => {
    console.log("User is unset");
    setCookie("jwt-auth", null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setCurrentUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
