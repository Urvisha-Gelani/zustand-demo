import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import useAppStore from '../../store/AppStore';
import Spinner from '../Spinner/Spinner';
import { UserSchema } from '../../vallidation/errorsSchema';
import { LuUserCircle } from 'react-icons/lu';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
export interface UserType {
    // username: string;
    id: number
    first_name: string;
    last_name: string;
    // email: string;
    gender: string;

}

function Update() {
    const getUser = useAppStore(state => state.getUser)
    const loading = useAppStore(state => state.loading)
    const updateUser = useAppStore(state => state.updateUser)
    const navigate = useNavigate()
    const localUser = JSON.parse(localStorage.getItem("User"))
    const initialValues: UserType = {
        id: Number(localUser.id),
        first_name: localUser.first_name,
        last_name: localUser.last_name,
        gender: localUser.gender,
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, getFieldProps } = useFormik({
        initialValues: initialValues,
        validationSchema: UserSchema,
        onSubmit: async (values: UserType) => {
            console.log(values);
            await updateUser(values)
        },
    })
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <div className=''>
                <div className='w-[600px] mx-auto px-[20px] py-[15px] '>
                    <div className='bg-[#cfcfcf7d] mt-[15px] px-[20px] py-[15px]'>
                        {(loading) ? <div className=' absolute position-ab opacity-[1] z-[3]'>
                            <Spinner />
                        </div> : <div>
                            <div className='flex justify-between  text-3xl items-center'>
                                <div className='flex w-[250px] mx-auto gap-[3px] justify-evenly'>
                                    <LuUserCircle />
                                    <h1 className=' text-center'>Update profile</h1>
                                </div>
                                <IoCloseOutline onClick={() => navigate("/users")} className='w-[15%] text-right text-2xl' />

                            </div>
                            <form className="mt-5" onSubmit={handleSubmit}>
                                <div className=" flex flex-wrap items-center">
                                    <div className='w-2/4 mb-3'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            UserName {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border  bg-[#FEFDED] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='username'
                                                type="text"
                                                placeholder="Username"
                                                value={localUser.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'

                                            />
                                        </div>
                                        <p className='text-[12px]'>Note :You can not change username.</p>

                                    </div>
                                    <div className='w-2/4 margin-0 mb-3'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            First Name {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border  bg-[#FEFDED] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='first_name'
                                                type="text"
                                                placeholder="First Name"
                                                autoComplete='off'
                                                value={values.first_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {(errors.first_name && touched.first_name) ? <p className=' text-red-600'>{errors.first_name}</p> : null}
                                    </div>
                                    <div className='w-2/4 mb-3'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Last Name {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border  bg-[#FEFDED] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='last_name'
                                                type="text"
                                                placeholder="Last Name"
                                                autoComplete='off'
                                                value={values.last_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {(errors.last_name && touched.last_name) ? <p className=' text-red-600'>{errors.last_name}</p> : null}
                                    </div>
                                    <div className='w-2/4 mb-3'>
                                        <div className='flex'>
                                            <label htmlFor="" className="text-base font-medium text-gray-900 w-1/5">
                                                {' '}
                                                Gender {' '}
                                            </label>

                                            <div role="group" aria-labelledby="my-radio-group" className='w-4/5 flex ml-3'>
                                                <label>
                                                    <input type="radio" name="gender" value="M" onBlur={handleBlur} checked={values.gender === "M" ? true : false}
                                                        onChange={getFieldProps("type").onChange} />
                                                    {' '}Male{' '}
                                                </label>
                                                <label className='ml-3'>
                                                    <input type="radio" name="gender" value="F" onBlur={handleBlur} checked={values.gender === "F" ? true : false}
                                                        onChange={getFieldProps("type").onChange} />
                                                    {' '}Female{' '}
                                                </label>

                                            </div>

                                        </div>
                                        {(errors.gender && touched.gender) ? <p className=' text-red-600'>{errors.gender}</p> : null}
                                    </div>
                                    <div className='w-full mb-3'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border  bg-[#FEFDED] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                name='email'
                                                value={localUser.email}
                                                placeholder="Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                            // disabled={true}
                                            />
                                        </div>
                                        <p className='text-[12px]'>Note :You can not change email.</p>
                                        {/* <p>You can not change your username</p> */}
                                        {/* {(signUpData.errors !== undefined) ? <p className='text-red-600'>{signUpData.errors.email}</p> : null} */}
                                    </div>



                                </div>
                                <div className='mt-5 text-center'>
                                    <button
                                        type="submit"
                                        className="inline-flex  items-center justify-center rounded-md bg-[#304463] px-[20px] py-[5px] font-semibold leading-7 text-white "
                                    >
                                        Update
                                    </button>

                                </div>

                            </form></div>}


                    </div>
                </div>
            </div>
        </>
    );
}

export default Update;
