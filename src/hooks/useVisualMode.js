import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); 
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    setMode(newMode);
    if (replace === true) {
      let newHistory = [...history];
      newHistory[history.length - 1] = newMode;
      setHistory(newHistory);
    } else {
      let newHistory = [...history, newMode];
      setHistory(newHistory);
    }
  }

  function back () {
    if (history.length > 1) {
      let newHistory = [...history];
      newHistory.pop();
      setMode(history[history.length - 2]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}