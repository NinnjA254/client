import axios from '../axiosConfig';

export async function cancelOrder(orderId){
	const response = await axios.patch(`/orders/${orderId.toString()}/cancel`)
	return response.data
}