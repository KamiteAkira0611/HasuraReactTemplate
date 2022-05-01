import { Button } from "@mui/material";
import React from "react";
import useAuth from "src/common/hooks/useAuth";

const AccountView = () => {
  const { user, logout } = useAuth();

  console.log(user);

  return (
    <div>
      <p>{user.email}</p>
      <p>{user.id}</p>
      <Button
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default AccountView;
