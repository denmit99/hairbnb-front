import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import NotFoundPage from "../components/pages/NotFoundPage";
import { AuthContext, AuthContextType } from "../context/AuthContext";

interface PrivateRouteProps {
  children?: ReactNode;
  role?: string;
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user } = useContext(AuthContext) as AuthContextType;
  const isAuthenticated = user !== null;
  console.log("user: " + JSON.stringify(user));
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  if (role && user?.role.toLowerCase() === role.toLowerCase()) {
    return <>{children}</>;
  }
  console.log(
    `Access denied. User must have role=${role} but has role=${user?.role}`
  );
  return <NotFoundPage />;
}

export default PrivateRoute;
