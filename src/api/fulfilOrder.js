import axios from '../axiosConfig';

export async function fulfilOrder(orderId){
	const response = await axios.patch(`/orders/${orderId.toString()}/fulfil`)
	return response.data
}