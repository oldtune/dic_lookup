export type WordDefinition = {
    word: string;
    pronounceEn?: string;
    pronounceUk?: string;
    pronounceVi?: string;
    audioEnUrl?: string;
    audioUkUrl?: string;
    audioVi?: string;
    wordTypes: WordType[]
}

export type WordType = {
    wordTypeVi: string;
    wordTypeEn: string;
    meanings: WordMeaning[];
}

export type WordMeaning = {
    meaningEn: string;
    meaningVi: string;
    examples: Example[];
}

export type Example = {
    example: string;
    enMeaning?: string;
    viMeaning?: string;
}
