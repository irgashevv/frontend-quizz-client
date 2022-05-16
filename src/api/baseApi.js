import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://service-quizz.tj/api",
});

export default baseApi;
