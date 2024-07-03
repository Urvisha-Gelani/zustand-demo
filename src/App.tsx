import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./components/form/SignIn"
import SignUp from "./components/form/SignUp"
import SigninUser from "./components/users/SigninUser";

function App ()  {

  return (
    <>
    <Router>
      <Routes>
        
          <Route index element={<SignIn/>} />
          <Route path="Signin" element={<SignIn/>} />
          <Route path="Signup" element={ <SignUp/>} />
          <Route path="users/*" element={ <SigninUser/>} />
        

      </Routes>
    </Router>
    
     
    
    </>
  )
}

export default App
