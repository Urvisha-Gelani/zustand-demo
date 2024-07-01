import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/users/SignIn"
import SignUp from "./components/users/SignUp"

function App ()  {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route >
          <Route index element={<SignIn/>} />
          <Route path="Signin" element={<SignIn/>} />
          <Route path="Signup" element={ <SignUp/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
    
     
    
    </>
  )
}

export default App
