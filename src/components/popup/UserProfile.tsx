import React from 'react';
import useAppStore from '../../store/AppStore';

function UserProfile() {
    const user = useAppStore(state => state.user)
    return (
        <>
            <div className='model w-full'>
                <div className='text-center'>
                    <h1 className='text-3xl'>Profile</h1>
                </div>
                <div className='px-[10px] py-[3px] pb-[5px]'>
                    <p className='mt-[5px]'>Username :</p>
                    <p className='px-[10px] py-[6px] rounded-[8px] bg-[#F4F6FF] my-[5px]'>{user.username}</p>
                    <p className='mt-[5px]'>First Name :</p>
                    <p className='px-[10px] py-[6px] rounded-[8px] bg-[#F4F6FF] my-[5px]'>{user.first_name}</p>
                    <p className='mt-[5px]'>Last Name :</p>
                    <p className='px-[10px] py-[6px] rounded-[8px] bg-[#F4F6FF] my-[5px]'>{user.last_name}</p>
                    <p className='mt-[5px]'>Gender :</p>
                    <p className='px-[10px] py-[6px] rounded-[8px] bg-[#F4F6FF] my-[5px]'>{(user.gender === "M") ? "Male" : "Female"}</p>
                    <p className='mt-[5px]'>Email :</p>
                    <p className='px-[10px] py-[6px] rounded-[8px] bg-[#F4F6FF] my-[5px]'>{user.email}</p>
                </div>
                
            </div>
        </>
    );
}

export default UserProfile;
