import type { Result } from "../share/result";
import { Http } from "./http";

export const DictionaryApi = {
    getSuggestion: async (word: string): Promise<Result<WordSuggestion[]>> => {
        return await Http.get(import.meta.env.PUBLIC_DICTIONARY_API, `api/word/${word}`);
    }
}

export type WordSuggestion = {
    word: string;
};