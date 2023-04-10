import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../api/fetchProducts";
import "./CartAcquisition.css";

export default function Cart({ selectedItems, setSelectedItems }) {
  //state variables and refs
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [qtyValue, setQtyValue] = useState(0); //quantity of product to be added to cart
  const [prizePerItemValue, setPrizePerItemValue] = useState(0);
  const addedProducts = useRef([]); //check products that have already been added to cart so they cannot be re added
  //fecth products from server, putting only the ones that have a qty greater than zero in available products
  useEffect(() => {
    fetchProducts().then((response) => {
      setAvailableProducts(response.data);
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
        <li key={index} className="cart-acquisition-item">
          <p className="cart-acquisition-item-name">{` ${item.name}`}</p>
          <input
            className="cart-acquisition-item-input"
            value={item.quantity}
            min={1}
            type="number"
            onChange={(e) => {
              //find item in selected items by index and update its quantity, then update selected Items
              const quantityAvailable = availableProducts.filter((val) => {
                return val._id === selectedItems[index]._id;
              })[0].quantity;
              setSelectedItems((prev) => {
                const i = [...prev];
                i[index].quantity = parseInt(e.target.value) || 0;
                //console.log(i)
                return i;
              });
            }}
          />

          <input
            className="cart-acquisition-item-input"
            value={item.prizePerItem}
            min={1}
            type="number"
            onChange={(e) => {
              //find item in selected items by index and update its quantity, then update selected Items
              if (e.target.value <= 0) {
                alert("prize per item cannot be 0!");
              } else {
                setSelectedItems((prev) => {
                  const i = [...prev];
                  i[index].prizePerItem = parseInt(e.target.value) || 0;
                  //console.log(i)
                  return i;
                });
              }
            }}
          />

          <button
            type="button"
            className="cart-acquisition-item-button"
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
    } else if (prizePerItemValue <= 0) {
      alert("price per item cannot be 0");
    } else {
      addedProducts.current.push(selectValue);
      setSelectedItems((prev) => {
        return [
          ...prev,
          {
            _id: availableProducts[selectValue]._id,
            name: availableProducts[selectValue].name,
            quantity: qtyValue,
            prizePerItem: prizePerItemValue,
          },
        ];
      });
    }
  }
  return (
    <div id="cart-acquisition">
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
        <input
          id="add-item-form-input"
          type="number"
          min={0}
          required
          value={prizePerItemValue}
          onChange={(e) => setPrizePerItemValue(parseInt(e.target.value) || 0)}
        />
        <button id="add-item-form-button" type="button" onClick={handleAddItem}>
          Add
        </button>
      </div>
      <ul id="cart-acquisition-items-container">{populateItemsSold()}</ul>
    </div>
  );
}
