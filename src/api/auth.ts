import { axiosInstance } from "../config";

export const authenticateAccount = async (body: Object) => {
    const { data } = await axiosInstance.post('auth/login', body);
    return data;
}

export const createAccount = async (body: Object) => {
    const { data } = await axiosInstance.post('auth/sign_up', body);
    return data;
}