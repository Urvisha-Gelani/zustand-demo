/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from "./components/form/SignIn"
import SignUp from "./components/form/SignUp"
import SigninUser from "./components/layout/UserLayout";
import Profile from './components/commonPages/Profile';
import Update, { UserType } from './components/commonPages/Update';
import NoPage from './components/errorPage/NoPage';
import Users from './components/users';
import Companies from './components/companiesPages/Companies';

function App() {
const localdata:any = localStorage.getItem("User")
const localUser : UserType = JSON.parse(localdata)
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route index element={(localStorage.getItem("accessToken")) ? <Navigate to="/users" /> : <Navigate to="/Signin" />} />
            <Route path="Signin" element={<SignIn />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path='/' element={<SigninUser />} >
              <Route index element={<Users />} />
              <Route path='users' element={<Users />} />
              <Route path='companies' element={<Companies />} />
              <Route path='profile' element={<Profile />} />
              {/* <Route path='*' element={<NoPage />} /> */}
              <Route path="settings" element={<Update title="Update profile" data={localUser} />} />
            </Route>
            <Route path='*' element={<NoPage />} />
          </Route>



        </Routes>
      </Router>



    </>
  )
}

export default App
