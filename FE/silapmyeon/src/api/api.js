import axios from "axios";

const jwt = {
  Authorization:
};

const instance = axios.create({
  baseURL: "https://silapmyeon.com/api",
  headers: jwt,
});

export default instance;
