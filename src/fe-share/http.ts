import axios from "axios";
import { createError, createOk, type Result } from "../share/result";

export const Http = {
    get: async (header: Map<string, string>, query: Map<string, string>, endpoint: string, path: string) => {
        return await performHttpRequest(HttpMethod.Get, `${endpoint}${path}`);
    },
};

const performHttpRequest = async <T>(method: HttpMethod, endpoint: string): Promise<Result<T>> => {
    const result = await axios.get(endpoint);
    if (result.status == 200) {
        createOk(result.data);
    }
    return createError(result.statusText);
};

export enum HttpMethod {
    Get,
    Post,
    Put,
    Delete
};