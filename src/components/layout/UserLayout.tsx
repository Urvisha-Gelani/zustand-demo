import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';



function SigninUser() {
    const navigate = useNavigate()
    useEffect(() => {
     if(!localStorage.getItem("accessToken")) {
        navigate("/Signin")
     }
    }, []);

    return (
        <>
            <div className='h-[100%]'>
                <div className='h-[100%]  w-full flex flex-wrap  justify-between '>
                    <div className='w-[20%] h-[100vh] bg-white px-3 py-4 rounded-r-2xl page-box-shadow'>
                        <SideBar />
                    </div>
                    <div className='w-[78%] h-[100%]'>
                        <div>
                            <Navbar />
                        </div>
                        <div className=' mt-2 rounded-t-2xl h-full bg-white'>
                            <Outlet />
                            
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SigninUser;
