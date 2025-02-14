import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const StorageContext = createContext();

// In-memory cache to prevent flickering
const cache = new Map();

// Utility function to fetch from cache/localStorage
function getStoredValue(key, initialValue) {
    if (typeof window === "undefined") {
        return initialValue; // Prevent errors in SSR/static environments
    }

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


// Storage Provider
export const StorageProvider = ({ initialValues = {}, children }) => {

    console.log("initialValues", initialValues);


    const [storage, setStorage] = useState(() => {
        return Object.keys(initialValues).reduce((acc, key) => {
            acc[key] = getStoredValue(key, initialValues[key]);
            return acc;
        }, {});
    });

    useEffect(() => {
        // Ensure storage initializes correctly
        setStorage(prevStorage => {
            console.log("Previous storage", prevStorage);
            const updatedStorage = { ...prevStorage };
            Object.keys(initialValues).forEach(key => {
                if (!(key in prevStorage)) {
                    updatedStorage[key] = getStoredValue(key, initialValues[key]);
                }
            });
            return updatedStorage;
        });
    }, [initialValues]);

    // Function to update a specific storage key
    const setStoredValue = (key, value) => {
        console.log("setting storage", key, value);
        setStorage(prevStorage => {
            const newStorage = { ...prevStorage, [key]: value };
            cache.set(key, value); // Update memory cache
            localStorage.setItem(key, JSON.stringify(value)); // Sync to local storage
            return newStorage;
        });
    };

    return (
        <StorageContext.Provider value={{ storage, setStoredValue }}>
            {children}
        </StorageContext.Provider>
    );
};

// Custom hook to access a specific storage key
export const useStorage = (key) => {
    const { storage, setStoredValue } = useContext(StorageContext);
    const value = storage[key] ?? null;
    console.log("using storage hook", key, value);

    return [value, (newValue) => setStoredValue(key, newValue)];
};
