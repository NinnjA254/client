import axios from "../axiosConfig";

export async function cancelAcquisition(acquisitionId) {
  const response = await axios.patch(
    `/acquisitions/${acquisitionId.toString()}/cancel`
  );
  return response.data;
}
