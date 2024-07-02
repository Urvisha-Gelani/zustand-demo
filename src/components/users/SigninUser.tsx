import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Companies from './Companies';
// import Profile from './Profile';

function SigninUser() {

    return (
        <>
            <div className='h-full w-full flex flex-wrap  justify-between bg-[#f5f5f5]'>
                <div className='w-[20%] h-auto bg-white px-3 py-4 rounded-r-2xl page-box-shadow'>
                    <SideBar />
                </div>
                <div className='w-[78%] h-screen'>
                    <div>
                        <Navbar />
                    </div>
                    <div>
                        <Routes>
                            <Route path='companies' element={<Companies />} />
                            {/* <Route path='profile' element={<Profile />} /> */}
                        </Routes>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SigninUser;
