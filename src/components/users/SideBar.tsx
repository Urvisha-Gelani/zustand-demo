import React, { useState } from 'react';
import { FaLayerGroup } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
function SideBar() {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <>
            <div className=''>
                <h1 className='text-3xl text-blue-950'>Welcome</h1>
                <div className='my-2'>
                    <div className='w-[200px] mx-auto'>
                        <p className='text-sky-800'>- Main</p>
                        <Link to="profile" className='pl-[10px] py-[10px] text-blue-900 bg-[#6c52760a] text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white'>
                            <MdOutlineDashboard />
                            <p className='ml-3 font-normal '>Dashboard</p>
                        </Link>
                        <Link to="companies" className='pl-[10px] py-[10px] text-blue-900 bg-[#6c52760a] text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white'>
                            <FaLayerGroup />
                            <p className='ml-3 font-normal '>Companies</p>
                        </Link>
                        <Link to="/users" className={`pl-[10px] py-[10px] text-blue-900 text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white ${(isActive) ? "bg-[#304463] text-white" : "bg-[#6c52760a] text-blue-900"}`} onClick={() => setIsActive(true)}>
                            <HiOutlineUserGroup />
                            <p className='ml-3 font-normal '>Users</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
