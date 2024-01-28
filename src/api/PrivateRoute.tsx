import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";
import NotFoundPage from "../components/pages/NotFoundPage";

interface PrivateRouteProps {
  children?: ReactNode;
  role?: string;
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { getUser } = useAuth();
  const user = getUser();
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
