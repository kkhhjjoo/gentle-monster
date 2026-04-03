import axios from "axios";
// 상황따라 주소 다름
const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
// const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;
// console.log("proxy", BACKEND_PROXY);
const api = axios.create({
  baseURL: import.meta.env.PROD ? "" : LOCAL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (!error.response) {
      console.log("NETWORK ERROR", error.message);
      return Promise.reject({ message: '서버에 연결할 수 없습니다' });
    }
    console.log("RESPONSE ERROR", error.response.data);
    return Promise.reject(error.response.data);
  }
);

export default api;