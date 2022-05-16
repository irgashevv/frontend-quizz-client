import baseApi from "./baseApi";

export const registration = (data) => {
  return baseApi.post("/register", data);
};
