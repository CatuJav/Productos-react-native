import axios from 'axios';
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

export default cafeApi;