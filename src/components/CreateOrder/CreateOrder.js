import './CreateOrder.css';
import React, {useState} from 'react';
import Cart from '../cart/Cart';
import { createOrder } from '../../api/createOrder';
import { fetchOrders } from '../../api/fetchOrders';




export default function CreateOrder({setShowForm,setOrders}){
	const[selectedItems,setSelectedItems] = useState([])
	//console.log(selectedItems)
	function handleSubmit(e){
		e.preventDefault();
		if(selectedItems.length === 0){
			alert("cart cannot be empty")
		}
		else{
			console.log(e.target.firstName.value,e.target.lastName.value)
			console.log(selectedItems)
			const orderInfo ={
				customerInfo:{
					firstName:e.target.firstName.value,
					lastName:e.target.lastName.value,
				},
				productInfo: selectedItems
			}
			createOrder(orderInfo).then(response =>{
				console.log(response)
				if(response.status === 200){
					fetchOrders().then((response) =>{ //update orders and display the orders list/page
						if(response.status === 200){
							setShowForm(false)
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
	}

   

	return(
		<div id="create-order">
			<form id ="create-order-form" onSubmit = {handleSubmit}>
				<input className = 'create-order-form-input' type="text" placeholder="first name" required name = 'firstName'/>
				<input className = 'create-order-form-input' type="text" placeholder="last name" required name = 'lastName'/>
				<Cart 
					selectedItems = {selectedItems}
					setSelectedItems = {setSelectedItems}
				/>
				<button type = "submit" >Create order</button>
				<button type = "button" onClick = {() =>setShowForm(false)}>close</button>
			</form>
		</div>
	)
}