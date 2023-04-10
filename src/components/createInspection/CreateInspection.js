import "./CreateInspection.css";
import React, { useState } from "react";
import CartInspection from "../cartInspection/CartInspection";
import { createInspection } from "../../api/createInspection";
import { fetchInspections } from "../../api/fetchInspections";

export default function CreateInspection({ setShowForm, setInspections }) {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);
  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.report.value);
    console.log(selectedItems);
    const inspectionInfo = {
      report: e.target.report.value,
      productInfo: selectedItems,
    };
    createInspection(inspectionInfo).then((response) => {
      console.log(response);
      if (response.status === 200) {
        fetchInspections().then((response) => {
          //update inspections and display the inspections list/page
          if (response.status === 200) {
            setShowForm(false);
            setInspections(response.data);
          }
          //handle authorisation here
        });
      } else {
        alert(response.message);
        console.log(response.message);
      }
    });
  }

  return (
    <div id="create-inspection">
      <form id="create-inspection-form" onSubmit={handleSubmit}>
        <textarea
          className="create-inspection-form-input"
          type="text"
          placeholder="Please type in the inspection report"
          required
          name="report"
        />
        <CartInspection
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <div>
          <button
            className="create-inspection-close-and-submit-buttons"
            type="submit"
          >
            Create inspection
          </button>
          <button
            className="create-inspection-close-and-submit-buttons"
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
