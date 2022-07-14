import React,{useEffect,useRef,useState} from 'react'
import { fetchOrders } from '../../api/fetchOrders'
import CreateOrder from '../CreateOrder/CreateOrder'
import Order from '../order/Order'
import './Orders.css'

function renderOrders(orders,setOrders){ 
	if(orders){
		const ordersCmp = orders.map((order,index) => {
			return (
				<Order key = {index} order = {order} setOrders = {setOrders}/>
			)
		}) 
		return ordersCmp
	}
	
}

export default function Orders(){
	const [orders,setOrders] = useState(null)
	const [showForm,setShowForm] = useState(false)
	// console.log(orders)
	useEffect(() => {
		// console.log("effect")
		fetchOrders().then((response) =>{
			if(response.status === 200){
				setOrders(response.data)
			}
			//handle authorisation here
		})
	},[])
	
	const ordersRender = (
			<ul id = 'orders-container'>
				{renderOrders(orders,setOrders)}
			</ul>
	)

	const createOrder = (
		<CreateOrder setShowForm = {setShowForm} setOrders = {setOrders}/>
	)
	return(
		<div id = 'orders'>
			<div id = 'orders-header-and-search-bar'>
				<div id = 'orders-header'>
					<h3>Orders</h3>
					{!showForm && <button id = 'create-order-button' onClick = {()=>setShowForm(prev => !prev)}>CreateOrder</button>}
				</div>
				<div id ='orders-search-bar'>
					Search
				</div>
			</div>
			
			{showForm ? createOrder : ordersRender}	
		</div>
	)
}