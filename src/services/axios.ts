import axios, { AxiosHeaders } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});
export default api;
