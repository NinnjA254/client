import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../api/fetchProducts";
import "./CartOrder.css";

export default function CartOrder({ selectedItems, setSelectedItems }) {
  //state variables and refs
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [qtyValue, setQtyValue] = useState(0); //quantity of product to be added to cart
  const addedProducts = useRef([]); //check products that have already been added to cart so they cannot be re added
  //fecth products from server, putting only the ones that have a qty greater than zero in available products
  useEffect(() => {
    fetchProducts().then((response) => {
      setAvailableProducts(
        response.data.filter((product) => product.quantity > 0)
      );
    });
  }, []); //added qtyValue to dependency array to ensure concurrency between ui and changes that might heppen in db from other places

  //display available products in dropdown
  function populateProductOptions() {
    return availableProducts.map((product, index) => {
      return <option key={index} value={index}>{`${product.name}`}</option>;
    });
  }

  //display the details(name and quantity) of all the sold items in cart
  function populateItemsSold() {
    return selectedItems.map((item, index) => {
      return (
        <li key={index} className="cart-order-item">
          <p className="cart-order-item-name">{` ${item.name}`}</p>
          <input
            className="cart-order-item-input"
            value={item.quantity}
            min={1}
            type="number"
            onChange={(e) => {
              //find item in selected items by index and update its quantity, then update selected Items
              const quantityAvailable = availableProducts.filter((val) => {
                return val._id === selectedItems[index]._id;
              })[0].quantity;

              if (quantityAvailable < parseInt(e.target.value)) {
                alert("not enough in stock");
              } else {
                setSelectedItems((prev) => {
                  const i = [...prev];
                  i[index].quantity = parseInt(e.target.value) || 0;
                  //console.log(i)
                  return i;
                });
              }
            }}
          />
          <button
            type="button"
            className="cart-order-item-button"
            onClick={() => {
              //remove item from cart
              addedProducts.current.splice(index, 1);
              setSelectedItems((prev) => prev.filter((val, i) => i !== index));
            }}
          >
            Remove
          </button>
        </li>
      );
    });
  }

  //add items to cart when user clicks add button
  function handleAddItem() {
    if (addedProducts.current.includes(selectValue)) {
      alert(
        `${availableProducts[selectValue].name} has already been added to your cart`
      );
    } else if (qtyValue <= 0) {
      alert("Quantity of product has to be greater than zero");
      //improve this alert to some kind of cool ui thing
    } else if (availableProducts[selectValue].quantity < qtyValue) {
      alert(
        `${availableProducts[selectValue].name} in stock:${availableProducts[selectValue].quantity}`
      );
    } else {
      addedProducts.current.push(selectValue);
      setSelectedItems((prev) => {
        return [
          ...prev,
          {
            _id: availableProducts[selectValue]._id,
            name: availableProducts[selectValue].name,
            quantity: qtyValue,
          },
        ];
      });
    }
  }
  return (
    <div id="cart-order">
      <div id="add-item-form">
        <select
          id="add-item-form-select"
          value={selectValue}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectValue(e.target.value);
          }}
        >
          {populateProductOptions()}
        </select>
        <input
          id="add-item-form-input"
          type="number"
          min={0}
          required
          value={qtyValue}
          onChange={(e) => setQtyValue(parseInt(e.target.value) || 0)}
        />
        <button id="add-item-form-button" type="button" onClick={handleAddItem}>
          Add
        </button>
      </div>
      <ul id="cart-order-items-container">{populateItemsSold()}</ul>
    </div>
  );
}
