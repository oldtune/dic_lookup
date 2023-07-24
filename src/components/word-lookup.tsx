import type React from "react";
import { useEffect, useRef, useState } from "react";
import "../styles/word-lookup.css";

export type WordLookupProps = {
  word: string;
};

export const WordLookup: React.FC<WordLookupProps> = (props: WordLookupProps) => {
  const [inputValue, setInputValue] = useState(props.word);
  const formRef = useRef<any>();

  useEffect(() => {
    if (props.word) {
      setInputValue(props.word);
    }
  })

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

  return <div className="relative word-lookup-wrapper">
    <form ref={formRef} onSubmit={(event) => onSubmit(event)}>
      <input placeholder="Search here..." onChange={(event) => setInputValue(event.target.value)} className="w-full h-10" />
      <i className="fa-solid fa-magnifying-glass search-icon absolute cursor-pointer" title="Perform search" onClick={() => navigateIfNotEmpty(inputValue)}></i>
    </form>
  </div>;
};