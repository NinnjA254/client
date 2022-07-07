import axios from '../axiosConfig';

export async function fetchProducts(){
	const response = await axios.get('/products')
	return response.data  
}