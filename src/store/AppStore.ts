/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { SignupValues } from "../components/form/SignUp";
import { SigninValues } from "../components/form/SignIn";
import { User } from "../interface/interface";
import axios from "axios";
import { UserType } from "../components/commonPages/Update";
import { apiUrl } from "../common/Common";


export interface tokenErrorType {
    success : boolean;
    status: number;
    error : {
        detail : string;
    }
}

interface signupResponseType {
    success?: boolean;
    status?: number;
    message?: string;
    errors?: ErrorType;
}

export interface ErrorType {
    email?: string[];
    username?: string[];
    non_fields_errors?: string[]
}
export interface AppStoreState {
    new_user: string;
    loading: boolean;
    signUpData: signupResponseType;
    addUserData: signupResponseType;
    // localUser : User | undefined
    user: User | User[];
    allUser: User | User[];
    tokenError : tokenErrorType ;
    postUser: (data: SignupValues) => Promise<void>;
    clear_inputErrors: () => void;
    hidePopUp: () => void;
    signInUser: (data: SigninValues) => Promise<void>;
    getUser: () => Promise<void>;
    updateUser: (data: UserType) => Promise<void>;
    getAllUsers: () => Promise<void>;
    deleteUser: (id: number | undefined) => void;
    logout : () => void
}

const useAppStore = create<AppStoreState>((set) => ({
    new_user: "",
    loading: false,
    signUpData: {},
    addUserData: {},
    tokenError : {
        success :true,
        status : 0,
        error :{
            detail : ""
        }
    },
    user: [],
    allUser: [],
    postUser: async (data: SignupValues) => {
        try {
            // set({ loading: true });
            const response = await fetch(`${apiUrl}api/user/register/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseData = await response.json();
            if (responseData.success) {
                set({ loading: true, addUserData: responseData })
            } else {

                set({ loading: false, addUserData: responseData });
            }

        } catch (error) {
            set({ loading: false })

        }
    },
    clear_inputErrors: () => {
        set({
            addUserData: {
                errors: {
                    username: [],
                    email: []
                }
            },
            signUpData: {
                errors: {
                    username: [],
                    email: []
                }
            }
        })
    },
    hidePopUp: () => {
        set({
            signUpData: {
                success: false
            },
            addUserData: {
                success: false
            }
        })
    },
    logout : () => {
        localStorage.clear()
    },
    signInUser: async (data: SigninValues) => {
        try {
            set({ loading: true , tokenError : {
                success :true,
                status : 0,
                error :{
                    detail : ""
                }
            }})
            const response = await fetch(`${apiUrl}api/user/login/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            if (responseData.success) {
                localStorage.setItem("accessToken", responseData.data.token.access)
                localStorage.setItem("refreshToken", responseData.data.token.refresh)
            }
            set({ loading: false, signUpData: responseData });
        } catch (error) {
            set({ loading: false })

        }
    },
    getUser: async () => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`${apiUrl}api/user/profile/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            localStorage.setItem("User",JSON.stringify(response.data.data.user))
            set({ loading: false, user: response.data.data.user });

        } catch (error) {
            set({ loading: false })
        }
    },
    updateUser: async (data) => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.patch(`${apiUrl}api/users/${data.id}/`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },

            })
            localStorage.setItem("User", JSON.stringify(response.data.data.user))
            set({ loading: false, user: response.data.data.user , addUserData: {
                success : true,
                message : "Updated successFully!"
            } })

            set((state) => ({
                allUser: (state.allUser as User[]).map((user:User)=>
                    user.id === data.id ? { ...user, ...data } : user
                )
            }))
           
        } catch (error) {
            set({ loading: false })
        }
    },
    getAllUsers: async () => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`${apiUrl}api/users/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ loading: false, allUser: response.data.data.users })
        } catch (error:any) {
            
            if(error.response.data.status == 401) {
                    set({tokenError : error.response .data , loading : false})
                    
            }
            
        }
    },
    deleteUser: async (id) => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
             await axios.delete(`${apiUrl}api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ loading: false , addUserData: {
                success : true,
                message : "Deleted successFully!"
            } })
            set((state) => ({
                allUser: (state.allUser as User[]).filter((user: User) => user.id !== id),
            }));

        } catch (error) {
            set({ loading: false })
        }
    }




}));
export default useAppStore