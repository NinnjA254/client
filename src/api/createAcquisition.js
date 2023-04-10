import axios from "../axiosConfig";

export async function createAcquisition(acquisitionInfo) {
  const response = await axios.post("/acquisitions", acquisitionInfo);
  return response.data;
}
