import React, { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from '../form/SignIn';
// import Companies from './Companies';
// import Profile from './Profile';
// import Update from './Update';
// import Users from './Users';


function SigninUser() {
    const navigate = useNavigate()
    useEffect(() => {
     if(!localStorage.getItem("accessToken")) {
        navigate("/Signin")
     }
    }, []);

    return (
        <>
            <div className=' h-screen'>
                <div className='h-screen  w-full flex flex-wrap  justify-between '>
                    <div className='w-[20%] h-screen bg-white px-3 py-4 rounded-r-2xl page-box-shadow'>
                        <SideBar />
                    </div>
                    <div className='w-[78%] h-screen'>
                        <div>
                            <Navbar />
                        </div>
                        <div className=' mt-2 rounded-t-2xl h-full bg-white'>
                            <Outlet />
                            {/* <Routes>
                                <Route index element={<Users />} />
                                <Route path='users' element={<Users />} />
                                <Route path='companies' element={<Companies />} />
                                <Route path='profile' element={<Profile />} />
                                <Route path="settings" element={<Update title="Update profile" data={JSON.parse(localStorage.getItem("User"))}/>}/>
                            </Routes> */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SigninUser;
