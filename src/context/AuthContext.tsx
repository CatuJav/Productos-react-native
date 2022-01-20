import React, { createContext, useReducer } from "react";
import { Usuario } from "./appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    sigUp: () => void;
    sigIp: () => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    errorMessage: '',
    user: null
}
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    const sigUp = () => { };
    const sigIp = () => { };
    const logOut = () => { };
    const removeError = () => { };

    return (
        <AuthContext.Provider value={{
            ...state,
            sigUp,
            sigIp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}