import React, { createContext, useState, useEffect } from "react";
import runChat from "../config/ai";
import { marked } from "marked";

export const Context = createContext();

const MAX_PREV_PROMPTS = 7; // Maximum number of recent prompts to store

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const localData = localStorage.getItem("prevPrompts");
    return localData ? JSON.parse(localData) : [];
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "prevPrompts",
      JSON.stringify(prevPrompts.slice(-MAX_PREV_PROMPTS))
    );
  }, [prevPrompts]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 30 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt = input) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    // Add prompt to the beginning of the array
    setPrevPrompts((prev) => [prompt, ...prev.slice(0, MAX_PREV_PROMPTS - 1)]);
    setInput("");
    const response = await runChat(prompt);
    let newResponse = marked(response);
    let newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
