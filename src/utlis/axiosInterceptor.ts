import axios from "axios";

const axiosInstance = axios.create();
if (!axiosInstance) {
    throw new Error('axiosInstance is not defined');
}
axiosInstance.interceptors.request.use((config) => config);
export default axiosInstance;