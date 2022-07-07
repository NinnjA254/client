import { useState } from 'react';
import { cancelOrder } from '../../api/cancelOrder';
import { fetchOrders } from '../../api/fetchOrders';
import { fulfilOrder } from '../../api/fulfilOrder';
import './Order.css';


export default function Order({order,setOrders}){
	let isFulfilled = order.orderStatus
	
	function handleFulfill(){ //fulfil order upon click
		fulfilOrder(order._id).then((response)=>{
			console.log(response)
			if(response.status === 200){
				console.log("fulfilation")
				fetchOrders().then((response) =>{
					if(response.status === 200){
						setOrders(response.data)
					}
					//handle authorisation here
				})
			}
			else{
				alert(response.message)
				console.log(response.message)
			}
		})
	}

	function handleCancel(){ // cancel order upon click
		console.log('cancellin')
		cancelOrder(order._id).then((response)=>{
			if(response.status === 200){
				fetchOrders().then((response) =>{
					if(response.status === 200){
						setOrders(response.data)
					}
					//handle authorisation here
				})
			}
			else{
				alert(response.message)
				console.log(response.message)
			}
		})
	}

	const itemsSold = order.itemsSold.map((item,index) =>{
		return (
			<div key = {index} id = 'item-sold'>
				<p>{item.productId.name}</p>
				<p>qty:{item.quantitySold}</p>
			</div>
		)
	})
	return(
		<div id ="order">
			<div id = 'order-details'>
				<p>{order._id}</p>
				<p>{order.customerId.firstName + " " + order.customerId.lastName}</p>
				<p>{order.orderStatus.toString()}</p>
				<p>{order.time}</p>
				<p>total </p>
			</div>
			
			<div id = 'items-sold-container'>
				<h4>Items sold</h4>
				<div id = 'items-sold'>
					{itemsSold}
				</div>
				
			</div>
			<div id = "order-fulfil-cancel-buttons-container">
				<button className = 'order-button' onClick={handleFulfill} disabled = {isFulfilled}>{!isFulfilled ? 'fulfill' : 'already fulfilled'}</button>
				<button className = 'order-button' onClick={handleCancel} disabled = {isFulfilled}>cancel</button> 
			</div>
			

		</div>
	)
}