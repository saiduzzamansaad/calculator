import React, { useState, useEffect, useCallback } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import CalcButton from './CalcButton';
import HistoryPanel from './HistoryPanel';
import ScientificPanel from './ScientificPanel';
import VoiceInput from './VoiceInput';

interface CalculatorProps {
  onNavigate: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onNavigate }) => {
  const { 
    input, 
    result, 
    history,
    isScientific, 
    isDarkMode, 
    setInput, 
    setResult, 
    addToHistory,
    toggleScientific,
    toggleDarkMode 
  } = useCalculator();

  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Bengali numbers mapping
  const banglaNumbers: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫',
    '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
  };

  // Convert English numbers to Bengali
  const toBanglaNumber = (num: string): string => {
    return num.split('').map(char => banglaNumbers[char] || char).join('');
  };

  // Convert Bengali numbers to English for calculation
  const toEnglishNumber = (num: string): string => {
    const englishNumbers: { [key: string]: string } = {
      '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5',
      '৬': '6', '৭': '7', '৮': '8', '৯': '9', '.': '.'
    };
    
    return num.split('').map(char => englishNumbers[char] || char).join('');
  };

  // Handle button clicks
  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(prev => prev.slice(0, -1));
    } else if (value === '=') {
      calculateResult();
    } else if (value === '%') {
      handlePercentage();
    } else if (value === '±') {
      handleSignChange();
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', 'π', 'e'].includes(value)) {
      handleScientificFunction(value);
    } else {
      setInput(prev => prev + value);
    }
  };

  // Calculate the result
  const calculateResult = useCallback(() => {
    try {
      if (!input) return;
      
      let expression = toEnglishNumber(input);
      expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      
      const calculatedResult = eval(expression);
      const formattedResult = Number.isInteger(calculatedResult) 
        ? calculatedResult.toString() 
        : parseFloat(calculatedResult.toFixed(10)).toString();
      
      const banglaResult = toBanglaNumber(formattedResult);
      setResult(banglaResult);
      
      addToHistory({
        expression: input,
        result: banglaResult
      });
    } catch (error) {
      setResult('ত্রুটি');
    }
  }, [input, addToHistory, setResult]);

  // Handle percentage calculation
  const handlePercentage = () => {
    try {
      let expression = toEnglishNumber(input);
      if (['+', '-', '*', '/', '×', '÷'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      
      const parts = expression.split(/[\+\-\*\/]/);
      const lastNumber = parseFloat(parts[parts.length - 1]);
      const percentage = lastNumber / 100;
      
      const newExpression = expression.slice(0, expression.lastIndexOf(parts[parts.length - 1])) + percentage;
      setInput(toBanglaNumber(newExpression).replace(/\*/g, '×').replace(/\//g, '÷'));
    } catch (error) {
      setResult('ত্রুটি');
    }
  };

  // Handle sign change
  const handleSignChange = () => {
    try {
      let expression = toEnglishNumber(input);
      const parts = expression.split(/[\+\-\*\/]/);
      const lastNumber = parts[parts.length - 1];
      
      if (lastNumber && lastNumber !== '') {
        const newNumber = (-parseFloat(lastNumber)).toString();
        const newExpression = expression.slice(0, expression.lastIndexOf(lastNumber)) + newNumber;
        setInput(toBanglaNumber(newExpression).replace(/\*/g, '×').replace(/\//g, '÷'));
      }
    } catch (error) {
      setResult('ত্রুটি');
    }
  };

  // Handle scientific functions
  const handleScientificFunction = (func: string) => {
    try {
      let expression = toEnglishNumber(input);
      let result: number;
      
      switch (func) {
        case 'sin': result = Math.sin(parseFloat(expression) * Math.PI / 180); break;
        case 'cos': result = Math.cos(parseFloat(expression) * Math.PI / 180); break;
        case 'tan': result = Math.tan(parseFloat(expression) * Math.PI / 180); break;
        case 'log': result = Math.log10(parseFloat(expression)); break;
        case 'ln': result = Math.log(parseFloat(expression)); break;
        case '√': result = Math.sqrt(parseFloat(expression)); break;
        case 'x²': result = Math.pow(parseFloat(expression), 2); break;
        case 'x³': result = Math.pow(parseFloat(expression), 3); break;
        case 'π': result = Math.PI; break;
        case 'e': result = Math.E; break;
        default: result = parseFloat(expression);
      }
      
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(10)).toString();
      
      setInput(toBanglaNumber(formattedResult));
    } catch (error) {
      setResult('ত্রুটি');
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (key >= '0' && key <= '9') {
        handleButtonClick(toBanglaNumber(key));
      } else if (key === '.') {
        handleButtonClick('.');
      } else if (key === '+') {
        handleButtonClick('+');
      } else if (key === '-') {
        handleButtonClick('-');
      } else if (key === '*') {
        handleButtonClick('×');
      } else if (key === '/') {
        e.preventDefault();
        handleButtonClick('÷');
      } else if (key === 'Enter' || key === '=') {
        handleButtonClick('=');
      } else if (key === 'Escape') {
        handleButtonClick('C');
      } else if (key === 'Backspace') {
        handleButtonClick('⌫');
      } else if (key === '%') {
        handleButtonClick('%');
      } else if (key === 's' && e.ctrlKey) {
        e.preventDefault();
        toggleScientific();
      } else if (key === 'd' && e.ctrlKey) {
        e.preventDefault();
        toggleDarkMode();
      } else if (key === 'h' && e.ctrlKey) {
        e.preventDefault();
        setShowHistory(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick, toggleScientific, toggleDarkMode]);

  // Copy result to clipboard
  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'ফলাফল কপি করা হয়েছে!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  // Speak result
  const speakResult = () => {
    if (result && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.lang = 'bn-BD';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      {/* Header */}
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={onNavigate}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span>←</span>
            <span>ল্যান্ডিং পেজ</span>
          </button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            বাংলা ক্যালকুলেটর
          </h1>
          
          <div className="flex items-center space-x-2">
            <VoiceInput onResult={(text) => setInput(text)} />
            
            <button
              onClick={toggleScientific}
              className={`p-2 rounded-lg transition-colors ${
                isScientific 
                  ? 'bg-blue-500 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-600'
              }`}
              title="বৈজ্ঞানিক মোড (Ctrl+S)"
            >
              ⚡
            </button>
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-800 text-white'
              }`}
              title="ডার্ক মোড (Ctrl+D)"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${
                showHistory 
                  ? 'bg-purple-500 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-600'
              }`}
              title="ইতিহাস (Ctrl+H)"
            >
              📊
            </button>
          </div>
        </div>
      </header>

      <div className="flex justify-center items-start p-4">
        {/* Main Calculator */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Display Area */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <div className="text-right space-y-2">
              <div className="h-6 text-sm opacity-80 overflow-hidden">
                {input || '০'}
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm opacity-80">ফলাফল:</span>
                <div 
                  className={`text-3xl font-bold break-all text-right transition-all duration-200 ${
                    result ? 'text-green-200' : 'text-blue-200'
                  }`}
                  style={{ 
                    fontSize: result.length > 15 ? '1.5rem' : 
                             result.length > 10 ? '2rem' : '2.5rem' 
                  }}
                >
                  {result || '০'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 flex space-x-2 border-b">
            <button
              onClick={copyToClipboard}
              disabled={!result}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                result 
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              📋 কপি
            </button>
            <button
              onClick={speakResult}
              disabled={!result || isSpeaking}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                result && !isSpeaking
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSpeaking ? '🔊 বলছি...' : '🎤 বলুন'}
            </button>
          </div>

          {/* Scientific Panel */}
          {isScientific && (
            <ScientificPanel onButtonClick={handleButtonClick} />
          )}

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3 p-4">
            <CalcButton value="C" onClick={handleButtonClick} type="clear" />
            <CalcButton value="⌫" onClick={handleButtonClick} type="backspace" />
            <CalcButton value="%" onClick={handleButtonClick} type="operator" />
            <CalcButton value="÷" onClick={handleButtonClick} type="operator" />
            
            <CalcButton value="৭" onClick={handleButtonClick} type="number" />
            <CalcButton value="৮" onClick={handleButtonClick} type="number" />
            <CalcButton value="৯" onClick={handleButtonClick} type="number" />
            <CalcButton value="×" onClick={handleButtonClick} type="operator" />
            
            <CalcButton value="৪" onClick={handleButtonClick} type="number" />
            <CalcButton value="৫" onClick={handleButtonClick} type="number" />
            <CalcButton value="৬" onClick={handleButtonClick} type="number" />
            <CalcButton value="-" onClick={handleButtonClick} type="operator" />
            
            <CalcButton value="১" onClick={handleButtonClick} type="number" />
            <CalcButton value="২" onClick={handleButtonClick} type="number" />
            <CalcButton value="৩" onClick={handleButtonClick} type="number" />
            <CalcButton value="+" onClick={handleButtonClick} type="operator" />
            
            <CalcButton value="±" onClick={handleButtonClick} type="operator" />
            <CalcButton value="০" onClick={handleButtonClick} type="number" />
            <CalcButton value="." onClick={handleButtonClick} type="number" />
            <CalcButton value="=" onClick={handleButtonClick} type="equals" />
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <HistoryPanel onClose={() => setShowHistory(false)} />
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className={`max-w-6xl mx-auto p-4 mt-4 rounded-lg ${
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className="text-sm">
          <strong>কীবোর্ড শর্টকাট:</strong> Ctrl+S (বৈজ্ঞানিক মোড), Ctrl+D (ডার্ক মোড), Ctrl+H (ইতিহাস)
        </div>
      </div>
    </div>
  );
};

export default Calculator;