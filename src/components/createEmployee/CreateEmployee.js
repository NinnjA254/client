import "./CreateEmployee.css";
import React, { useState } from "react";
import { createEmployee } from "../../api/createEmployee";
import { fetchEmployees } from "../../api/fetchEmployees";

export default function CreateEmployee({ setShowForm, setEmployees }) {
  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.firstName.value);
    const employeeInfo = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      password: e.target.password.value,
      accessAllowed: ["orders", "acquisitions", "inspections"],
    };
    createEmployee(employeeInfo).then((response) => {
      console.log(response);
      if (response.status === 200) {
        fetchEmployees().then((response) => {
          //update employees and display the employees list/page
          if (response.status === 200) {
            setShowForm(false);
            setEmployees(response.data);
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
    <div id="create-employee">
      <form id="create-employee-form" onSubmit={handleSubmit}>
        <input
          className="create-employee-form-input"
          type="text"
          placeholder="employee first name"
          required
          name="firstName"
        />
        <input
          className="create-employee-form-input"
          type="text"
          placeholder="employee last name"
          required
          name="lastName"
        />
        <input
          className="create-employee-form-input"
          type="text"
          placeholder="employee password"
          required
          name="password"
        />

        <div>
          <button
            className="create-employee-close-and-submit-buttons"
            type="submit"
          >
            Create employee
          </button>
          <button
            className="create-employee-close-and-submit-buttons"
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
