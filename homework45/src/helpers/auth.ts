import axios, { type AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import { API_URL } from "../store/const";

const AUTH_TOKEN_STORAGE_NAME = 'authToken';

export const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_NAME, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const tokenAvailable = (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
}

export const useToken = (): boolean => {
    const token: string | null = localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
    console.log('useToken');
    console.log(token);

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return !!token;
}

export const removeToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_NAME);
}
