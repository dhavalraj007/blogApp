import axios from "axios";
import { decodeToken, isExpired } from "react-jwt";

export const getAccessToken = async () => {
  const token = localStorage.getItem("blogApp_access_token");
  const decoded = decodeToken(token);
  if (!decoded) {
    console.log("token not valid");
    return;
  }
  const Expired = isExpired(token);
  if (!Expired) return token;

  const { data } = await axios.post("/user/refresh-token", {
    refresh_token: getRefreshToken(),
  });
  setAccessToken(data.access_token);
  return data.access_token;
};

export const getRefreshToken = () => {
  return localStorage.getItem("blogApp_refresh_token");
};

export const setAccessToken = (access_token) => {
  localStorage.setItem("blogApp_access_token", access_token);
};

export const setRefreshToken = (refresh_token) => {
  localStorage.setItem("blogApp_refresh_token", refresh_token);
};

export const clearTokens = () => {
  localStorage.removeItem("blogApp_access_token");
  localStorage.removeItem("blogApp_refresh_token");
};
