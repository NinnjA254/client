import { fetchEmployees } from "../../api/fetchEmployees";
import "./Employee.css";

export default function Employee({ employee }) {
  console.log("emp", employee.accessAllowed);
  const accessAllowed = employee.accessAllowed.map((access, index) => {
    return (
      <div key={index} id="employee-access-allowed">
        <p>{access}</p>
      </div>
    );
  });
  console.log(employee.accessAllowed);
  return (
    <div id="employee">
      <div id="employee-details">
        <p>{employee._id}</p>
        <p>{employee.firstName}</p>
        <p>{employee.lastName}</p>
        <p>
          <i>{employee.password}</i>
        </p>
      </div>

      <div id="employees-access-allowed-container">
        <h5>Access allowed</h5>
        <div id="employees-access-allowed">
          {accessAllowed.length > 0 ? accessAllowed : <p>No access-allowed</p>}
        </div>
      </div>
    </div>
  );
}
