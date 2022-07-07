import axios from '../axiosConfig';

export async function fetchOrders(){
	const response = await axios.get('/orders')
	return response.data  
}