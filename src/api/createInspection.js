import axios from "../axiosConfig";

export async function createInspection(inspectionInfo) {
  const response = await axios.post("/inspections", inspectionInfo);
  return response.data;
}
