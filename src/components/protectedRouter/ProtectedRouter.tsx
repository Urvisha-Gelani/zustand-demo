import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/Signin" />;
  }

//   if (!user) {
//     return <div>Loading...</div>; // or a loading spinner
//   }

  return <Outlet />;
}

export default ProtectedRouter;
