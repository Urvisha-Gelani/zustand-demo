import { create } from "zustand";
import { SignupValues } from "../components/form/SignUp";
import { SigninValues } from "../components/form/SignIn";
import { User } from "../interface/interface";
import axios from "axios";
import { UserType } from "../components/users/Update";
import Success from "../components/popup/Success";
// import axios from "axios";
// console.log( process.env.REACT_APP_HOST);
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
    user: User | [];
    allUser: User | [];
    postUser: (data: SignupValues) => Promise<void>;
    clear_inputErrors: () => void;
    hide_popUp: () => void;
    signInUser: (data: SigninValues) => Promise<void>;
    getUser: () => Promise<void>;
    updateUser: (data: UserType) => Promise<void>;
    getAllUsers: () => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    logout : () => void
}

const useAppStore = create<AppStoreState>((set) => ({
    new_user: "",
    loading: false,
    signUpData: [],
    addUserData: [],
    user: [],
    allUser: [],
    // localUser : JSON.parse(localStorage.getItem("User")),
    postUser: async (data: SignupValues) => {
        try {
            // set({ loading: true });
            const response = await fetch('http://192.168.1.17:9000/api/user/register/', {
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
    hide_popUp: () => {
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
            set({ loading: true })
            const response = await fetch('http://192.168.1.17:9000/api/user/login/', {
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
            const response = await axios.get('http://192.168.1.17:9000/api/user/profile/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            localStorage.setItem("User", JSON.stringify(response.data.data.user))
            set({ loading: false, user: response.data.data.user });

        } catch (error) {
            set({ loading: false })
        }
    },
    updateUser: async (data) => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.patch(`http://192.168.1.17:9000/api/users/${data.id}/`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },

            })
            localStorage.setItem("User", JSON.stringify(response.data.data.user))
            set({ loading: false, user: response.data.data.user })
            set((state) => ({
                allUser: state.allUser.map(user =>
                    user.id === data.id ? { ...user, ...data } : user
                )
            }));
        } catch (error) {
            set({ loading: false })
        }
    },
    getAllUsers: async () => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get('http://192.168.1.17:9000/api/users/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ loading: false, allUser: response.data.data.users })
        } catch (error) {
            set({ loading: false })
        }
    },
    deleteUser: async (id) => {
        try {
            set({ loading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.delete(`http://192.168.1.17:9000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ loading: false })
            set((state) => ({
                allUser: state.allUser.filter((user) => user.id !== id),
            }));

        } catch (error) {
            set({ loading: false })
        }
    }




}));
export default useAppStore