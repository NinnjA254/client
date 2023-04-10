import "./CreateAcquisition.css";
import React, { useState } from "react";
import CartAcquisition from "../cartAcquisition/CartAcquisition";
import { createAcquisition } from "../../api/createAcquisition";
import { fetchAcquisitions } from "../../api/fetchAcquisitions";

export default function CreateAcquisition({ setShowForm, setAcquisitions }) {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);
  function handleSubmit(e) {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("cart cannot be empty");
    } else {
      console.log(e.target.firstName.value, e.target.lastName.value);
      console.log(selectedItems);
      const acquisitionInfo = {
        supplierInfo: {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
        },
        productInfo: selectedItems,
      };
      createAcquisition(acquisitionInfo).then((response) => {
        if (response.status === 200) {
          fetchAcquisitions().then((response) => {
            //update acquisitions and display the acquisitions list/page
            if (response.status === 200) {
              setShowForm(false);
              setAcquisitions(response.data);
            }
            //handle authorisation here
          });
        } else {
          alert(response.message, "r");
          console.log(response.message);
        }
      });
    }
  }

  return (
    <div id="create-acquisition">
      <form id="create-acquisition-form" onSubmit={handleSubmit}>
        <input
          className="create-acquisition-form-input"
          type="text"
          placeholder="first name"
          required
          name="firstName"
        />
        <input
          className="create-acquisition-form-input"
          type="text"
          placeholder="last name"
          required
          name="lastName"
        />
        <CartAcquisition
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <div>
          <button
            className="create-acquisition-close-and-submit-buttons"
            type="submit"
          >
            Create acquisition
          </button>
          <button
            className="create-acquisition-close-and-submit-buttons"
            type="button"
            onClick={() => setShowForm(false)}
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
}
