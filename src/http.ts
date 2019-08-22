import axios from "axios";

const http = axios.create({
    baseURL: process.env.API_URL || "/api",
});

export default http;
