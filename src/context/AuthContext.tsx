import React, { createContext, useReducer } from "react";
import cafeApi from "../api/cafeApi";
import { LoginData, LoginResponse, Usuario } from "./appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    sigUp: () => void;
    sigIn: (loginData: LoginData) => void;
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
    const sigIn = async ({ correo, password }: LoginData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            //console.log(resp.data);
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })
        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    const logOut = () => { };
    const removeError = () => { 

        dispatch({type:'removeError'})
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            sigUp,
            sigIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}