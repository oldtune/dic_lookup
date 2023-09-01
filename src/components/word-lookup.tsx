import type React from "react";
import { useEffect, useRef, useState } from "react";
import { DictionaryApi } from "../fe-share/dictionary-api";
import "../styles/word-lookup.css";

export type WordLookupProps = {
  word: string;
};


export const WordLookup: React.FC<WordLookupProps> = (props: WordLookupProps) => {
  const [inputValue, setInputValue] = useState(props.word);
  // const [showSuggestion, setShowSuggestion] = useState(false);
  const formRef = useRef<any>();
  const [suggestions, setSuggestions] = useState([]);
  const suggestionDiaglogRef = useRef<any>();
  // const [suggestionList, setSuggestionList] = useState<string[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // const hasSelection = selectedIndex >= 0 && suggestionList.length >= 1;

  useEffect(() => {
    if (inputValue) {
      (async () => {
        var fetchSuggestionsResult = await DictionaryApi.getSuggestion(inputValue);
        if (fetchSuggestionsResult.)
          setSuggestions();
      })();
    }
  }, [inputValue]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateIfNotEmpty(inputValue);
  }

  const navigateToWord = (word: string) => {
    window.location.href = `/word/${word}`;
  }

  const navigateIfNotEmpty = (word: string) => {
    if (word == "") {
      return;
    }

    navigateToWord(word);
  }

  return (<div className="relative overflow-visible">
    <div className="relative word-lookup-wrapper">
      <form ref={formRef} onSubmit={(event) => onSubmit(event)}>
        <input placeholder="Search here..." onChange={(event) => setInputValue(event.target.value)} className="w-full h-10" />
        <i className="fa-solid fa-magnifying-glass search-icon absolute cursor-pointer" title="Perform search" onClick={() => navigateIfNotEmpty(inputValue)}></i>
      </form>
    </div>
    <div style={{ 'display': suggestions.length > 0 ? 'block' : 'none' }} ref={suggestionDiaglogRef} className="cursor-pointer word-suggestion border-2 border-black border-solid absolute top-12 left-0 w-full">
      <div className="border-l-8 selected">Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
    </div>
  </div>
  );
};
