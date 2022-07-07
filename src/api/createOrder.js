import axios from '../axiosConfig';

export async function createOrder(orderInfo){

	const response = await axios.post('/orders',orderInfo)
	return response.data
}