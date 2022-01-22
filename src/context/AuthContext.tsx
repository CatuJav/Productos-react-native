import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


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

    //Leer el AsyncStorage, pero los efectos no pueden ser asincoronos 
    useEffect(() => {

        checkToken();
    }, []);

    //Helper
    const checkToken = async() => {
       const token= await AsyncStorage.getItem('token', (error, token) => {
            //Este error se lanza si esque no se puede leer el dato por varias razones
           if(error){
               console.log({ error, msg: 'Instale la aplicación otra vez' });
           }

            return token;
        });

        //Si no hay token se dispara el no autenticado
        if(!token) return dispatch({type:'notAuthenticated'})

        //Si hay token verificar token. Usando la petición GET Renovar o Validar JWT
        //Si todo sale bien se ejecuta este dispatch
        const resp= await cafeApi.get('/auth');
            //Si la respuesta a ok 200
        if (resp.status!== 200) {
            return dispatch({type:'notAuthenticated'});
        }
        //Vuelve a guadar el un nuevo token revalidando la vigencia de caducidad ca vez que se llama a la peticion get
        //Si solo comentamos esta linea se guarda el anterior token pero solo  tiene vigencia por 7 días y no se renueva
        //await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }

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

            //Guardar el token
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    const logOut = async() => {
        //Limpiar el async storage
        await AsyncStorage.removeItem('token');
        dispatch({type:'logout'})
     };
    const removeError = () => {

        dispatch({ type: 'removeError' })
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