import { useState, useEffect } from "react";

// Use an in-memory cache to prevent flickering
const cache = new Map();

function getStoredValue(key, initialValue) {
  if (cache.has(key)) return cache.get(key); // Use memory cache first
  try {
    const storedValue = localStorage.getItem(key);
    const value = storedValue !== null ? JSON.parse(storedValue) : initialValue;
    cache.set(key, value); // Cache in memory
    return value;
  } catch (error) {
    console.error("Error accessing localStorage", error);
    return initialValue;
  }
}

function useLocalStorage(key, initialValue) {
  // Immediately get the value from localStorage to ensure no delay on initial render
  const initialStoredValue = getStoredValue(key, initialValue);
  
  // Use local state with initial value retrieved from localStorage
  const [value, setValue] = useState(initialStoredValue);

  // Effect to keep the cache in sync with localStorage
  useEffect(() => {
    const storedValue = getStoredValue(key, initialValue);
    setValue(storedValue); // Update state to ensure it's in sync
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    cache.set(key, newValue); // Update memory cache
    localStorage.setItem(key, JSON.stringify(newValue)); // Sync to local storage
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
