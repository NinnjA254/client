import axios from '../axiosConfig';

export async function checkLogin(){
	const response = await axios.get('/checklogin')
	return response.data  
}