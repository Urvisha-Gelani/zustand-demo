import { create } from "zustand";
import { SignupValues } from "../components/users/SignUp";
import { SigninValues } from "../components/users/SignIn";

interface signupResponseType {
    success?: boolean;
    status?: number;
    message?: string;
    errors?: ErrorType;
}
export interface ErrorType {
    email?: string[];
    username?: string[];
    non_fields_errors? : string[]
}
export interface AppStoreState {
    new_user: string;
    loading: boolean;
    signUp_data: signupResponseType;
    postUser: (data: SignupValues) => Promise<void>;
    clear_inputErrors: () => void;
    hide_popUp: () => void;
    signInUser: (data: SigninValues) => Promise<void>;
}

const useAppStore = create<AppStoreState>((set) => ({
    new_user: "",
    loading: false,
    signUp_data: [],
    postUser: async (data: SignupValues) => {
        try {
            set({ loading: true });
            const response = await fetch('http://192.168.1.17:9000/api/user/register/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseData = await response.json();
            set({ loading: false, signUp_data: responseData });

        } catch (error) {
            set({ loading: false })

        }
    },
    clear_inputErrors: () => {
        set({
            signUp_data: {
                errors: {
                    username: [],
                    email: []
                }
            }
        })
    },
    hide_popUp: () => {
        set({
            signUp_data: {
                success: false
            }
        })
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
            if(responseData.success) {
                localStorage.setItem("accessToken" ,responseData.data.token.access )
                localStorage.setItem("refreshToken" ,responseData.data.token.refresh )
            }
            set({ loading: false, signUp_data: responseData });
        } catch (error) {
            set({ loading: false })

        }
    }



}));
export default useAppStore