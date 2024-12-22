import { StorageConstants } from "@/constants/StorageConstants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import localSessionStorage from "@/hooks/localSessionStorage";
import CryptoJS from "crypto-js";
import { SignInModel } from "@/models/SignInModel";
const { removeItem } = localSessionStorage();

const ivBase64Token = async (ivVec: any) => {
  const ivData = CryptoJS.enc.Base64.stringify(ivVec);
  return ivData;
};

const encryptToken = async (ivVec: any, token: string) => {
  const encryptToken = CryptoJS.AES.encrypt(
    token,
    CryptoJS.enc.Utf8.parse(process?.env?.NEXT_PUBLIC_SECRET_KEY ?? ""),
    {
      iv: ivVec,
      mode: CryptoJS.mode.CFB,
    }
  ).ciphertext.toString(CryptoJS.enc.Base64);
  return encryptToken;
};

const getIvAndToken = async (token: string) => {
  // const token = ;
  const iv = CryptoJS.lib.WordArray.random(16);
  const ivBaseData = await ivBase64Token(iv);
  const encryptTokenData = await encryptToken(iv, token);
  const concatToken = ivBaseData + "" + encryptTokenData;
  return concatToken;
};

const getToken = async () => {
  const { getItem } = localSessionStorage();

  const currentUser = getItem(StorageConstants.CURRENT_USER_OBJECT, "session");
  let jwt = "";

  if (!currentUser) {
    return "";
  } else {
    jwt = (JSON.parse(currentUser) as SignInModel)?.token?.token || "";
  }
  return jwt;
};

const getConfig = (jwt: string, options?: AxiosRequestConfig<unknown>) => {
  const headers = {
    ...(options?.headers ? { ...Object(options?.headers) } : {}),
  };
  return {
    ...(options || {}),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
  };
};

/**
 * Sends an HTTP GET request to the specified URL.
 *
 * @param {string} URL - The URL to send the GET request to.
 * @param {AxiosRequestConfig<unknown>} [options] - Additional headers to include in the request.
 * @return {Promise<AxiosResponse>} A promise that resolves with the AxiosResponse if the request is successful.
 *
 * @example
 * // Example usage:
 * const response = await apiClient.get('https://example.com/posts/1');
 *
 * console.log(response.data);
 */
export const get = async (
  URL: string,
  options?: AxiosRequestConfig<unknown>
): Promise<AxiosResponse> => {
  // const jwt = await getToken();

  const config = getConfig("", options);

  return await axios.get(`${URL}`, config);
};

/**
 * Sends an HTTP POST request to the specified URL.
 *
 * @param {string} URL - The URL to send the POST request to.
 * @param {unknown} [payload] - The data to include in the request body.
 * @param {AxiosRequestConfig<unknown>} [options] - Additional headers to include in the request.
 * @return {Promise<AxiosResponse>} A promise that resolves with the AxiosResponse if the request is successful.
 *
 * @example
 * // Example usage:
 * const data = { title: 'foo', body: 'bar', userId: 1 };
 * const response = await apiClient.post('https://example.com/posts', data);
 * console.log(response.data);
 */
export const post = async (
  URL: string,
  payload?: unknown,
  options?: AxiosRequestConfig<unknown>
): Promise<AxiosResponse> => {
  // const jwt = await getToken();
  const config = getConfig("", options);
  return await axios.post(`${URL}`, payload, config);
};

/**
 * Sends an HTTP PATCH request to the specified URL.
 *
 * @param {string} URL - The URL to send the PATCH request to.
 * @param {unknown} payload - The data to include in the request body.
 * @param {AxiosRequestConfig<unknown>} [options] - Additional headers to include in the request.
 * @return {Promise<AxiosResponse>} A promise that resolves with the AxiosResponse if the request is successful.
 *
 * @example
 * // Example usage:
 * const data = { title: 'foo' };
 * const response = await apiClient.patch('https://example.com/posts/1', data);
 * console.log(response.data);
 */
export const patch = async (
  URL: string,
  payload: unknown,
  options?: AxiosRequestConfig<unknown>
): Promise<AxiosResponse> => {
  const jwt = await getToken();

  const config = getConfig(jwt || "", options);
  return await axios.patch(URL, payload, config);
};

/**
 * Sends an HTTP DELETE request to the specified URL.
 *
 * @param {string} URL - The URL to send the DELETE request to.
 * @param {AxiosRequestConfig<unknown>} [options] - Additional headers to include in the request.
 * @return {Promise<AxiosResponse>} A promise that resolves with the AxiosResponse if the request is successful.
 *
 * @example
 * // Example usage:
 * await apiClient._delete('https://example.com/posts/1');
 * console.log('Post deleted successfully');
 */
export const _delete = async (
  URL: string,
  options?: AxiosRequestConfig<unknown>
): Promise<AxiosResponse> => {
  const { getItem } = localSessionStorage();
  const jwt = await getToken();
  const jwt1 = getItem(StorageConstants.USER_ACCESS_TOKEN, "session");

  const config = getConfig(jwt || "", options);
  return await axios.delete(URL, config);
};

/**
 * Sends an HTTP PUT request to the specified URL.
 *
 * @param {string} URL - The URL to send the PUT request to.
 * @param {unknown} payload - The data to include in the request body.
 * @param {AxiosRequestConfig<unknown>} [options] - Additional headers to include in the request.
 * @return {Promise<AxiosResponse>} A promise that resolves with the AxiosResponse if the request is successful.
 *
 * @example
 * // Example usage:
 * const data = { title: 'foo', body: 'bar', userId: 1 };
 * const response = await apiClient.put('https://example.com/posts/1', data);
 * console.log(response.data);
 */
export const put = async (
  URL: string,
  payload?: unknown,
  options?: AxiosRequestConfig<unknown>
): Promise<AxiosResponse> => {
  const { getItem } = localSessionStorage();
  const jwt = await getToken();
  const jwt1 = getItem(StorageConstants.USER_ACCESS_TOKEN, "session");

  const config = getConfig(jwt || "", options);
  return await axios.put(`${URL}`, payload, config);
};

const apiClient = {
  post,
  get,
  patch,
  put,
  _delete,
};

export { apiClient };
