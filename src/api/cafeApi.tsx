import axios from 'axios';

const baseUrl='https://cafe-merm-react-native-app.herokuapp.com/api';

const cafeApi = axios.create({baseURL:baseUrl});

export default cafeApi;