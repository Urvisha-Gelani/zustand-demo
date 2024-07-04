import React, { useEffect } from 'react';
import useAppStore from '../../store/AppStore';
import { User } from '../../interface/interface';
import { BiEdit, BiShow } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';
import Popup from 'reactjs-popup';
import AddUser from '../popup/AddUser';
import Success from '../popup/Success';
import Spinner from '../Spinner/Spinner';
import Update from './Update';
import Delete from '../popup/Delete';

function Users() {
    const getAllUsers = useAppStore(state => state.getAllUsers)
    const addUserData = useAppStore(state => state.addUserData)
    const allUser = useAppStore(state => state.allUser)
    const hide_popUp = useAppStore(state => state.hide_popUp)
    const loading = useAppStore(state => state.loading)
    const deleteUser = useAppStore(state => state.deleteUser)
    if (addUserData.success) {
        setTimeout(() => {
            hide_popUp()
        }, 2000);
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <>
            <div className='w-[500px] mx-auto absolute top-0 left-[36vw]'>
                {(addUserData.success) ? <Success sucessfullMsg="Register Sucessfully" /> : ""}
            </div>
            <div className=''>
                <div className='px-[30px] py-[10px]'>
                    <div className='flex flex-wrap justify-between items-center '>
                        <div className='w-[75%]'>
                            <input className='flex h-10 w-11/12 rounded-md border  bg-[#f7f6e8] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                placeholder='Search...' />
                        </div>
                        <div className='w-[10%]'>
                            <Popup trigger={<button className='px-[10px] py-[9px] w-full bg-[#304463] text-white rounded-[8px] flex items-center justify-center gap-[8px] text-[15px]'>
                                <span> Add </span>
                                <IoMdPersonAdd className=' text-[20px]' />
                            </button>}>
                                {close => (
                                    <AddUser close={close} title="Add User" />
                                )}
                            </Popup>
                        </div>
                    </div>
                </div>
                <div className='px-[30px] text-3xl text-[#304463]'>
                    <h1>Users</h1>
                </div>
                <div className=''>
                    <div className="overflow-x-auto px-[10px] ">
                        {
                            (loading) ? <div className=' absolute position-ab opacity-[1] z-[3]'>
                                <Spinner />
                            </div> :
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
                                                return (<tr key={user.id} className='py-[15px]'>
                                                    <td className="border-b border-gray-300 px-4 py-[15px]">{user.username}</td>
                                                    <td className="border-b border-gray-300 px-4 py-[15px]">{user.first_name}</td>
                                                    <td className="border-b border-gray-300 px-4 py-[15px]">{user.last_name}</td>
                                                    <td className="border-b border-gray-300 px-4 py-[15px]">{user.gender}</td>
                                                    <td className="border-b border-gray-300 px-4 py-[15px]">{user.email}</td>
                                                    <td className="border-b border-gray-300 px-4 py-[15px] text-[18px]">
                                                        <Popup trigger={<button className='px-[10px] '><BiEdit /></button>}>
                                                            {close => (
                                                                <Update close={close} title="Update User" data={user} />
                                                            )}
                                                        </Popup>

                                                        <button className='px-[10px]'><BiShow /></button>
                                                        <Popup trigger={<button className='px-[10px]'><FaRegTrashAlt /></button>}>
                                                            {close => (
                                                                <Delete close={close} message="Are you sure you want to delete user?" id={Number(user.id)} deleteUse={deleteUser} />
                                                            )}
                                                        </Popup>

                                                    </td>

                                                </tr>)

                                            }))
                                        }
                                    </tbody>
                                </table>
                        }


                    </div>

                </div>
            </div>
        </>
    );
}

export default Users;
