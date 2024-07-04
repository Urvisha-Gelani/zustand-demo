import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from "./components/form/SignIn"
import SignUp from "./components/form/SignUp"
import SigninUser from "./components/users/SigninUser";
import Users from './components/users/Users';
import Companies from './components/users/Companies';
import Profile from './components/users/Profile';
import Update from './components/users/Update';

function App() {

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
              <Route path="settings" element={<Update title="Update profile" data={JSON.parse(localStorage.getItem("User"))} />} />
            </Route>
          </Route>



        </Routes>
      </Router>



    </>
  )
}

export default App
