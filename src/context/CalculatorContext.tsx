import React, { createContext, useContext, useState, useEffect } from 'react';

interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorContextType {
  input: string;
  result: string;
  history: Calculation[];
  isScientific: boolean;
  isDarkMode: boolean;
  setInput: (input: string) => void;
  setResult: (result: string) => void;
  addToHistory: (calculation: Omit<Calculation, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  toggleScientific: () => void;
  toggleDarkMode: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('banglaCalculatorHistory');
    const savedDarkMode = localStorage.getItem('banglaCalculatorDarkMode');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('banglaCalculatorHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('banglaCalculatorDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addToHistory = (calculation: Omit<Calculation, 'id' | 'timestamp'>) => {
    const newCalculation: Calculation = {
      ...calculation,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    setHistory(prev => [newCalculation, ...prev.slice(0, 49)]); // Keep last 50 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleScientific = () => {
    setIsScientific(prev => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <CalculatorContext.Provider value={{
      input,
      result,
      history,
      isScientific,
      isDarkMode,
      setInput,
      setResult,
      addToHistory,
      clearHistory,
      toggleScientific,
      toggleDarkMode
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};