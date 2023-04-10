import axios from "../axiosConfig";

export async function fetchInspections() {
  const response = await axios.get("/inspections");
  return response.data;
}
