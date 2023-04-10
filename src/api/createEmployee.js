import axios from "../axiosConfig";

export async function createEmployee(employeeInfo) {
  const response = await axios.post("/employees", employeeInfo);
  return response.data;
}
