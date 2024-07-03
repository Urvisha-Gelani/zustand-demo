import React, { useEffect } from 'react';
import useAppStore from '../../store/AppStore';
import { User } from '../../interface/interface';
import { BiEdit, BiShow } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

function Users() {
    const getAllUsers = useAppStore(state => state.getAllUsers)
    const allUser = useAppStore(state => state.allUser)
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <>
            {console.log(allUser)}
            <div className=''>
                <div className=''>
                    <div className="overflow-x-auto px-[10px] ">
                        <table className="min-w-full px-[10px] text-center table-striped border mt-[15px]">
                            <thead className=''>
                                <tr className=''>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">Username</th>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">First Name</th>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">Last Name</th>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">Gender</th>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">Email</th>
                                    <th className="border-b-2 border-gray-300  px-4 py-[15px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (allUser.map((user: User) => {
                                        return (<tr key={user.id}  className='py-[15px]'>
                                            <td className="border-b border-gray-300 px-4 py-[15px]">{user.username}</td>
                                            <td className="border-b border-gray-300 px-4 py-[15px]">{user.first_name}</td>
                                            <td className="border-b border-gray-300 px-4 py-[15px]">{user.last_name}</td>
                                            <td className="border-b border-gray-300 px-4 py-[15px]">{user.gender}</td>
                                            <td className="border-b border-gray-300 px-4 py-[15px]">{user.email}</td>
                                            <td className="border-b border-gray-300 px-4 py-[15px] text-[18px]">
                                                <button className='px-[10px] '><BiEdit /></button>
                                                <button className='px-[10px]'><BiShow /></button>
                                                <button className='px-[10px]'><FaRegTrashAlt /></button>
                                            </td>

                                        </tr>)

                                    }))
                                }
                                {/* <!-- More rows here --> */}
                            </tbody>
                        </table>
                    </div>
                    {/* <table className='w-[800px] mx-auto'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table> */}
                </div>
            </div>
        </>
    );
}

export default Users;
