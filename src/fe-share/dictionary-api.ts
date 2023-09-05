import type { Result } from "../share/result";
import { Http } from "./http";

export const DictionaryApi = {
    getSuggestion: async (word: string): Promise<Result<string[]>> => {
        return await Http.get(import.meta.env.PUBLIC_DICTIONARY_API, `api/word/suggest/?keyword=${word}`);
    }
}