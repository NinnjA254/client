import axios from "../axiosConfig";

export async function logout() {
  const response = await axios.get("/logout");
  return response.data;
}
