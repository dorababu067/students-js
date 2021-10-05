import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  const token = Cookies.get("access");
  return token ? `Bearer ${token}` : "";
}
const instance = axios.create({
  baseURL: "https://students-api-v1.herokuapp.com/api",
  headers: { Authorization: getToken() },
});

export default instance;
