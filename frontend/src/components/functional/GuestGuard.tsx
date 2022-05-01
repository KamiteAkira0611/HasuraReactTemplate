import { ReactNode } from "react";
import { Redirect } from "react-router";
import useAuth from "src/common/hooks/useAuth";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/account" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
