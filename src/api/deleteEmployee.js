import axios from "../axiosConfig";

export async function fetchEmployees(employeeId) {
  const response = await axios.delete("/${employeeId}/delete");
  return response.data;
}
