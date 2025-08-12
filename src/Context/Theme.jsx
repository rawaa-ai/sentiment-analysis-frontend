import React, { createContext, useContext, useEffect, useState } from 'react';
import { colorSchemes } from '../lib/themes';

const ColorDropdownContext = createContext();

export const ColorDropdownProvider = ({ children }) => {
    const [selectedSchemeKey, setSelectedSchemeKey] = useState(null); 

    useEffect(() => {
        const stored = localStorage.getItem('selectedScheme');
        if (stored && colorSchemes[stored]) {
            setSelectedSchemeKey(stored);
        } else {
            setSelectedSchemeKey("green");
        }
    }, []);

    useEffect(() => {
        if (selectedSchemeKey) {
            localStorage.setItem('selectedScheme', selectedSchemeKey);
        }
    }, [selectedSchemeKey]);

    const selectScheme = (key) => {
        if (colorSchemes[key]) {
            setSelectedSchemeKey(key);
        }
    };

    const selectedScheme = colorSchemes[selectedSchemeKey];

    if (!selectedScheme) return null;

    return (
        <ColorDropdownContext.Provider value={{ selectedSchemeKey, selectedScheme, selectScheme }}>
            {children}
        </ColorDropdownContext.Provider>
    );
};


export const useColorDropdown = () => useContext(ColorDropdownContext);
