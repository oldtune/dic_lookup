import { Http } from "./http";

export const DictionaryApi = {
    getSuggestion: async (word: string) => {
        const header: Map<string, string> = new Map<string, string>();
        const query: Map<string, string> = new Map<string, string>();

        return await Http.get(header, query, `api/word/${word}`, "http://localhost:5280/");
    }
}