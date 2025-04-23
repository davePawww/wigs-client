import axios from "axios";
import { handleAxiosError } from "./utils";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export async function getApi(
  url: string,
  rejectWithValue: (value: string) => unknown,
) {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
}

export async function postApi<T>(
  url: string,
  data: T,
  rejectWithValue: (value: string) => unknown,
) {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
}

export async function putApi<T>(
  url: string,
  data: T,
  rejectWithValue: (value: string) => unknown,
) {
  try {
    const response = await axios.put(`${API_BASE_URL}${url}`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
}

export async function deleteApi(
  url: string,
  id: string,
  rejectWithValue: (value: string) => unknown,
) {
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}?id=${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
}
