import axios from "axios";

const torreAPI = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:8080/",
});

export default {
  getUser(userName) {
    return torreAPI.get(`api/bios/${userName}`);
  },
};
