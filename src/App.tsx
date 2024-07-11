/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/form/SignIn";
import SignUp from "./components/form/SignUp";
import SigninUser from "./components/layout/UserLayout";
import Profile from "./components/commonPages/Profile";
import Update from "./components/commonPages/Update";
import NoPage from "./components/errorPage/NoPage";
import Users from "./components/users";
import Companies from "./components/companiesPages/Companies";
import CoNavbar from "./components/compnyLayout/CoNavbar";
import CompanyProfile from "./components/compnyLayout";
import Department from "./components/companiesPages/Department";
// import MaleUsers from "./components/users/MaleUsers";
// import FemaleUser from "./components/users/FemaleUser";
import { commonUser } from "./common/Common";
// import AuthenticatedUser from "./components/users/FemaleUser";
import useAppStore from "./store/AppStore";
import ProtectedRouter from "./components/protectedRouter/ProtectedRouter";
import MaleUsers from "./components/users/MaleUsers";
import FemaleUser from "./components/users/FemaleUser";

function App() {
  const { user } = useAppStore();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            {/* <Route
              index
              element={
                localStorage.getItem("accessToken") ? (
                  <Navigate
                    to={commonUser(x).gender == "M" ? "/Male_user" : "/Female_user"}
                  />
                ) : (
                  <Navigate to="/Signin" />
                )
              }
            /> */}
            <Route path="Signin" element={<SignIn />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path="/" element={<ProtectedRouter />}>
              <Route path="/" element={<SigninUser />}>
                <Route
                 index
                  element={
                    <Navigate
                      to={
                      user?.gender === "F"
                          ? "/Female_user"
                          : "/Male_user"
                      }
                    />
                  }
                />
                {user?.gender === "M" && (
                  <Route path="/Male_user" element={<MaleUsers />} />
                )}
                 {user?.gender === "F" && (
                  <Route path="/Female_user" element={<FemaleUser />} />
                )}
                {/* <Route index element={<AuthenticatedUser />} />
                <Route
                  path={user?.gender == "M" ? "/Male_user" : "/Female_user"}
                  element={<AuthenticatedUser />}
                /> */}
                {/* <Route path="/Female_user" element={<FemaleUser />} /> */}
                <Route path="/users" element={<Users />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/settings"
                  element={
                    <Update title="Update profile" data={commonUser()} />
                  }
                />
              </Route>
              <Route path="/companies/:companyId" element={<CoNavbar />}>
                <Route index element={<CompanyProfile />} />
                <Route
                  path="/companies/:companyId/departments"
                  element={<Department />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
