import React, { useEffect } from 'react';
import MainPage from '../users/MainPage';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LogInSchema } from '../../vallidation/errorsSchema';
import useAppStore from '../../store/AppStore';
import Spinner from '../Spinner/Spinner';

export interface SigninValues {
    email_or_username: string;
    password: string;
}

const initialValues = {
    email_or_username: "",
    password: "",
}
function SignIn() {
    const signInUser = useAppStore(state => state.signInUser)
    const signUpData = useAppStore(state => state.signUpData)
    // const hide_popUp = useAppStore(state => state.hide_popUp)
    const clear_inputErrors = useAppStore(state => state.clear_inputErrors)
    const navigate = useNavigate()
    const { setValues, setTouched, values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LogInSchema,
        onSubmit: async (values) => {
            console.log(values);
            await signInUser(values)
        }
    })
    const handleResetForm = () => {
        setValues({
            email_or_username: "",
            password: ""
        })
        setTouched({
            email_or_username: false,
            password: false
        })
    }
    useEffect(() => {
        if (signUpData.success) {
            handleResetForm()
            // setTimeout(() => {
            //     hide_popUp()
            // }, 2000);
            navigate("/user")
        }
    }, [signUpData]);
    return (
        <>
            <MainPage />
            <div className=' absolute position-ab opacity-[1] z-[3]'>
                <Spinner />
            </div>
            <div className='absolute position-ab'>
                <div className='w-[430px] h-full bg-white rounded-lg box-shadow'>
                    <div className='px-6 py-4'>
                        <div>
                            <div className='flex flex-wrap items-center'>
                                <div className='w-[70%]'>
                                    <p className=' text-xl'>Welcome</p>
                                </div>
                                <div className='w-[30%]'>
                                    <p className='text-[#8D8D8D]'>No Account?</p>
                                    <Link to="/Signup" className='text-[#B87514] transition-all duration-200 hover:underline'>Sign up</Link>
                                </div>
                            </div>
                            <div>
                                <h1 className=' text-3xl font-bold'>Sign in</h1>
                            </div>
                            <div className=''>
                                {(signUpData.errors !== undefined) ? <p className='text-red-600 mt-3'>{signUpData.errors.non_fields_errors}</p> : null}
                                <form className="mt-8" onSubmit={handleSubmit}>
                                    <div className="space-y-5">

                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Email address OR Username{' '}
                                            </label>
                                            <div className="mt-2">
                                                {/* <div className='text-2xl text-gray-400 font-light absolute top-[45%] left-[7%]'>  <CgMail /></div> */}

                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="text"
                                                    placeholder="Email / Username"
                                                    name="email_or_username"
                                                    value={values.email_or_username}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete='off'
                                                    onInput={() => clear_inputErrors()}

                                                />
                                            </div>
                                            {(errors.email_or_username && touched.email_or_username) ? <p className=' text-red-600'>{errors.email_or_username}</p> : null}
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Password{' '}
                                                </label>

                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="password"
                                                    placeholder="Password"
                                                    name='password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete='off'
                                                    onInput={() => clear_inputErrors()}

                                                />
                                            </div>
                                            {(errors.password && touched.password) ? <p className=' text-red-600'>{errors.password}</p> : null}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex w-full items-center justify-center rounded-md bg-[#E48700] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-yellow-800/80"
                                            >
                                                Sign in
                                            </button>

                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default SignIn;
