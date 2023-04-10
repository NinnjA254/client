import axios from "../axiosConfig";

export async function fetchAcquisitions() {
  const response = await axios.get("/acquisitions");
  return response.data;
}
