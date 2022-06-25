import axios from 'axios';


//configure environment variables

const baseUrl = 'http://localhost:3500'

export default axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});