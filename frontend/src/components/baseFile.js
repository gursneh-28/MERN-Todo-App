import axios from "axios";

const base = axios.create({
    baseURL : process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

base.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default base;