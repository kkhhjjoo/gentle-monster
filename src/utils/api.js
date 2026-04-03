import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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