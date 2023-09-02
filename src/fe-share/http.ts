import axios from "axios";
import { createError, createOk, type Result } from "../share/result";

export const Http = {
    get: async <T>(endpoint: string, path: string, header?: Map<string, string>, query?: Map<string, string>): Promise<Result<T>> => {
        return await performHttpRequest(HttpMethod.Get, `${endpoint}${path}`);
    },
};

const performHttpRequest = async <T>(method: HttpMethod, endpoint: string): Promise<Result<T>> => {
    const result = await axios.get(endpoint);
    if (result.status == 200) {
        return createOk(result.data);
    }

    return createError(result.statusText) as Result<T>;
};

export enum HttpMethod {
    Get,
    Post,
    Put,
    Delete
};