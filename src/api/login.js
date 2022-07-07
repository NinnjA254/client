import axios from '../axiosConfig';

export async function login(userData){
	const response = await axios.post('/login',userData)
	return response.data
}