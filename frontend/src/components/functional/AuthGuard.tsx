import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import useAuth from "src/common/hooks/useAuth";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/auth/register" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
