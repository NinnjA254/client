import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../../api/fetchEmployees";
import { checkLogin } from "../../api/checkLogin";
import CreateEmployee from "../createEmployee/CreateEmployee";
import Employee from "../employee/Employee";
import "./Admin.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Admin() {
  const [employees, setEmployees] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({
    idFilter: "",
    statusFilter: "All",
  });
  //console.log(employees)
  //console.log(filter.idFilter === '')
  useEffect(() => {
    checkLogin().then((response) => {
      if (response.data.includes("admin")) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    });
    fetchEmployees().then((response) => {
      if (response.status === 200) {
        setEmployees(response.data);
      }
      //handle authorisation here
    });
  }, []);
  console.log(employees);
  console.log(authorized);

  function renderEmployees() {
    if (employees.length >= 1) {
      if (filter.idFilter !== "") {
        //filtering by id only when idFilter length is greater than one
        if (filter.idFilter.length < 24) {
          return <p>Invalid Id</p>;
        }
        const foundEmployee =
          employees.find((employee) => employee._id === filter.idFilter) ||
          null;
        if (foundEmployee)
          return (
            <Employee employee={foundEmployee} setEmployees={setEmployees} />
          );
        return <p>Employee with that Id does not exist</p>;
      }
      if (filter.idFilter === "") {
        //if idFilter is empty, employees are displayed, filtered by statusFilter
        let filteredEmployees = [];
        if (filter.statusFilter === "All") {
          filteredEmployees = employees;
        } else if (filter.statusFilter === "Pending") {
          filteredEmployees = employees.filter(
            (employee) => employee.employeeStatus === false
          );
        } else if (filter.statusFilter === "Fulfilled") {
          filteredEmployees = filteredEmployees = employees.filter(
            (employee) => employee.employeeStatus === true
          );
        }
        if (filteredEmployees.length === 0)
          return <p>No {`No ${filter.statusFilter} employees found`}</p>;
        return filteredEmployees.map((employee, index) => (
          <Employee
            key={index}
            employee={employee}
            setEmployees={setEmployees}
          />
        ));
      }
    }
    return <p>There are no employees in the system</p>;
  }
  if (!authorized) return <p>You are not authorized to view this page</p>;
  return (
    <div id="employees">
      {}
      <div id="employees-header-and-search-bar">
        <div id="employees-header">
          <h3>Admin</h3>
          {!showForm && (
            <button
              id="create-employee-button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              Create Employee
            </button>
          )}
        </div>
        {!showForm ? (
          <SearchBar
            filter={filter}
            setFilter={setFilter}
            displayAllFilters={false}
            placeholder="Find Employee by Id"
          />
        ) : (
          <h5 id="create-employee-heading">create Employee</h5>
        )}
      </div>

      {showForm ? (
        <CreateEmployee setShowForm={setShowForm} setEmployees={setEmployees} />
      ) : (
        employees && <ul id="employees-container">{renderEmployees()}</ul> // the conditional && is to make sure employees don't render before they are fetched from the server
      )}
    </div>
  );
}
