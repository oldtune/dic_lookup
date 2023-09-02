import { createOk, type Result } from "../share/result";

export const DictionaryApi = {
    getSuggestion: async (word: string): Promise<Result<WordSuggestion[]>> => {
        // return await Http.get("http://localhost:5280/", `api/word/${word}`);
        return Promise.resolve(createOk<WordSuggestion[]>([{ word: 'hello' }, { word: 'hi' }, { word: 'hallah' }]));
    }
}

export type WordSuggestion = {
    word: string;
};