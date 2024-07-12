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
import { commonUser } from "./common/Common";
import useAppStore from "./store/AppStore";
import ProtectedRouter from "./components/protectedRouter/ProtectedRouter";
import MaleUsers from "./components/users/MaleUsers";
import FemaleUser from "./components/users/FemaleUser";
import NoUserPage from "./components/errorPage/NoUserPage";

function App() {
  const { user } = useAppStore();
console.log(user);
  const gender = commonUser()?.gender;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRouter />}>
          <Route path="/" element={<SigninUser />}>
            <Route
              index
              element={
                <Navigate to={gender === "F" ? "/female-user" : "/male-user"} />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/settings"
              element={<Update title="Update profile" data={commonUser()} />}
            />
            {gender === "M" ? (
              <Route path="/male-user" element={<MaleUsers />} />
            ) : (
              <Route path="/male-user" element={<NoUserPage />} />
            )}
            {gender === "F" ? (
              <Route path="/female-user" element={<FemaleUser />} />
            ) : (
              <Route path="/female-user" element={<NoUserPage />} />
            )}
          </Route>
          <Route path="/companies/:companyId" element={<CoNavbar />}>
            <Route index element={<CompanyProfile />} />
            <Route
              path="/companies/:companyId/departments"
              element={<Department />}
            />
          </Route>
        </Route>
        <Route path="Signin" element={<SignIn />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
