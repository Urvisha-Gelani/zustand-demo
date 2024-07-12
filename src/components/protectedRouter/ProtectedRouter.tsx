import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/Signin" />;
  }
  
  return <Outlet />;
}

export default ProtectedRouter;
