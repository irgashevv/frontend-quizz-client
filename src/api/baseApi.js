import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://api.quizz.tj/api",
});

export default baseApi;
