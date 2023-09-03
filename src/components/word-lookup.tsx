import type React from "react";
import { useEffect, useRef, useState } from "react";
import { DictionaryApi, WordSuggestion } from "../fe-share/dictionary-api";
import { Error, Ok, match } from "../share/result";
import "../styles/word-lookup.css";

export type WordLookupProps = {
  word: string;
};


export const WordLookup: React.FC<WordLookupProps> = (props: WordLookupProps) => {
  const [inputValue, setInputValue] = useState(props.word);
  const formRef = useRef<any>();
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);
  const suggestionDiaglogRef = useRef<any>();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);


  useEffect(() => {
    if (inputValue && inputValue.trim()) {
      (async () => {
        var fetchSuggestionsResult = await DictionaryApi.getSuggestion(inputValue);
        match(fetchSuggestionsResult, (result: Ok<WordSuggestion[]>) => {
          setSuggestions(result.data);
        },
          (error: Error) => { console.log(error) });
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

  const hasSelection = selectedIndex > -1;
  const suggestionNotEmpty = suggestions.length > 0;

  const enterPressedHandler = () => {
    if (selectedIndex > -1) {
      navigateToWord(suggestions[selectedIndex].word);
    }
    else {
      navigateToWord(inputValue);
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      enterPressedHandler();
      return;
    }

    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      event.preventDefault();
      const suggestionEmpty = !suggestionNotEmpty;

      if (suggestionEmpty) {
        return;
      }

      const suggestionMaxIndex = suggestions.length - 1;

      if (event.key == "ArrowUp") {
        if (selectedIndex == -1 || selectedIndex == 0) {
          setSelectedIndex(suggestionMaxIndex);
          return;
        }
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
          return;
        }
      }

      if (event.key == "ArrowDown") {
        if (selectedIndex == -1 || selectedIndex == suggestionMaxIndex) {
          setSelectedIndex(0);
          return;
        }
        if (selectedIndex > -1 && selectedIndex < suggestionMaxIndex) {
          setSelectedIndex(selectedIndex + 1);
        }
      }
    }
  }


  const isSelected = (suggestion: string) => hasSelection && suggestionNotEmpty && suggestions[selectedIndex].word == suggestion;

  const suggestionItems = suggestions.map((suggestion) => <div className={`${isSelected(suggestion.word) ? "selected" : ""} border-l-8 border-transparent cursor-pointer hover:border-sky-600`} key={suggestion.word}>{suggestion.word}</div>)

  return (<div className="relative overflow-visible">
    <div className="relative word-lookup-wrapper">
      <form ref={formRef} onSubmit={(event) => onSubmit(event)}>
        <input placeholder="Search here..." onKeyDown={(event) => keyDownHandler(event)} onChange={(event) => setInputValue(event.target.value)} className="w-full h-10" />
        <i className="fa-solid fa-magnifying-glass search-icon absolute cursor-pointer" title="Perform search" onClick={() => navigateIfNotEmpty(inputValue)}></i>
      </form>
    </div>
    <div style={{ 'display': suggestions.length > 0 ? 'block' : 'none' }} ref={suggestionDiaglogRef} className="cursor-pointer word-suggestion border-2 border-black border-solid absolute top-12 left-0 w-full">
      {suggestionItems}
    </div>
  </div>
  );
};
