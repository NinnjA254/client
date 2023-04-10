import axios from "../axiosConfig";

export async function fulfilAcquisition(acquisitionId) {
  const response = await axios.patch(
    `/acquisitions/${acquisitionId.toString()}/fulfil`
  );
  return response.data;
}
