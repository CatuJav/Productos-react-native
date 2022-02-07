import axios, { Method } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl='https://cafe-merm-react-native-app.herokuapp.com/api';

const cafeApi = axios.create({baseURL:baseUrl});

//Cualquier petición que haga va a vericar el Async Storage y luego ese token se manda en el header
//Se pone como middleware
cafeApi.interceptors.request.use(
    async (config)=>{
        const token= await AsyncStorage.getItem('token');
        //console.log({tke:token});
        if(token){
            config.headers!['x-token']=token;
        }
        return config;
    }
);

//TODO: Ver por que en axios no se puede enviar el archivo de la foto
//Por eso mientras se utiliza fetch
export const cafeFetch = async (endPoint: string, method: Method, contentType: string, data: any) => {
    const token = await AsyncStorage.getItem('token');
 
    return fetch(`${ baseUrl }/${ endPoint }`, {
        method,
        headers: {
            'Content-Type': contentType,
            'Accept': 'application/json',
            'x-token': token || ''
        },
        body: data
    });
}


export default cafeApi;