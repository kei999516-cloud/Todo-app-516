import { useEffect, useState } from "react";

// Keeps state in sync with localStorage so tasks survive a page refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
