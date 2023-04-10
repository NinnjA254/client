import axios from "../axiosConfig";

export async function fetchEmployees() {
  const response = await axios.get("/employees");
  return response.data;
}
