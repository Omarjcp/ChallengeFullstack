import axios from "axios";

const url = "http://localhost:3001/";

const instance = axios.create({
  baseURL: url,
});

const tokenAcceso = localStorage.getItem("token");

if (tokenAcceso) {
  instance.defaults.headers.common["Authorization"] = "Bearer " + tokenAcceso;
}

export default instance;
