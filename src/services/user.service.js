import axios from "axios";

const torreAPI = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:8080",
});

export default {
  getUser(userName) {
    return torreAPI.get(`/get1/bios/${userName}`);
  },
  getOpportunities(id) {
    return torreAPI.get(`/get2/suite/opportunities/${id}`);
  },
};
