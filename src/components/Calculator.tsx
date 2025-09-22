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

  // Enhanced Color themes with glass effects
  const themes = {
    light: {
      bg: 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30',
      calculator: 'bg-white/80 backdrop-blur-2xl border border-white/20',
      display: 'bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-cyan-600/90 backdrop-blur-lg',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600/80',
      button: 'bg-white/60 hover:bg-white/80 text-gray-700 backdrop-blur-sm border border-white/30',
      headerButton: 'text-gray-600 hover:text-gray-800 hover:bg-white/50 backdrop-blur-sm',
      glass: 'bg-white/20 backdrop-blur-lg border border-white/30'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20',
      calculator: 'bg-gray-800/80 backdrop-blur-2xl border border-gray-700/30',
      display: 'bg-gradient-to-r from-purple-700/90 via-blue-700/90 to-cyan-700/90 backdrop-blur-lg',
      text: 'text-white',
      textSecondary: 'text-gray-300/80',
      button: 'bg-gray-700/60 hover:bg-gray-600/80 text-gray-200 backdrop-blur-sm border border-gray-600/30',
      headerButton: 'text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm',
      glass: 'bg-gray-800/20 backdrop-blur-lg border border-gray-700/30'
    }
  };

  const theme = isDarkMode ? themes.dark : themes.light;

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
      setInput((prev: string) => prev.slice(0, -1));
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
      
      const expression = toEnglishNumber(input);
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
      // Enhanced toast notification with glass effect
      const toast = document.createElement('div');
      toast.className = `fixed top-6 right-6 px-6 py-3 rounded-2xl backdrop-blur-2xl z-50 transition-all duration-500 transform translate-x-0 ${
        isDarkMode 
          ? 'bg-green-600/20 border border-green-400/30 text-green-100' 
          : 'bg-green-500/20 border border-green-400/30 text-green-800'
      }`;
      toast.innerHTML = `
        <div class="flex items-center space-x-3">
          <span class="text-lg">✅</span>
          <span class="font-semibold">ফলাফল কপি করা হয়েছে!</span>
        </div>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
      }, 2000);
    }
  };

  // Speak result
  const speakResult = () => {
    if (result && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${theme.bg} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative p-4 lg:p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button 
              onClick={onNavigate}
              className={`group flex items-center space-x-3 px-5 py-3 rounded-2xl transition-all duration-500 hover:scale-105 backdrop-blur-lg border ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:bg-gray-700/50' 
                  : 'bg-white/30 border-gray-300/30 text-gray-700 hover:bg-white/50'
              } shadow-lg`}
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-semibold">ল্যান্ডিং পেজ</span>
            </button>
            
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              বাংলা ক্যালকুলেটর
            </h1>
            
            <div className="flex items-center space-x-3">
              <VoiceInput onResult={(text) => setInput(text)} />
              
              <button
                onClick={toggleScientific}
                className={`group p-4 rounded-2xl transition-all duration-500 hover:scale-110 backdrop-blur-lg border shadow-lg ${
                  isScientific 
                    ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white border-purple-400/50' 
                    : theme.button
                }`}
                title="বৈজ্ঞানিক মোড (Ctrl+S)"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🔬</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`group p-4 rounded-2xl transition-all duration-500 hover:scale-110 backdrop-blur-lg border shadow-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-yellow-400/80 to-orange-400/80 text-gray-900 border-yellow-400/50' 
                    : 'bg-gradient-to-r from-gray-700/80 to-gray-900/80 text-white border-gray-600/50'
                }`}
                title="ডার্ক মোড (Ctrl+D)"
              >
                <span className="text-lg group-hover:rotate-180 transition-transform">
                  {isDarkMode ? '☀️' : '🌙'}
                </span>
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`group p-4 rounded-2xl transition-all duration-500 hover:scale-110 backdrop-blur-lg border shadow-lg ${
                  showHistory 
                    ? 'bg-gradient-to-r from-green-500/80 to-blue-500/80 text-white border-green-400/50' 
                    : theme.button
                }`}
                title="ইতিহাস (Ctrl+H)"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">📊</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex flex-col lg:flex-row justify-center items-start p-4 lg:p-6 space-y-6 lg:space-y-0 lg:space-x-8 z-10">
        {/* Main Calculator */}
        <div className={`w-full max-w-md lg:max-w-lg mx-auto rounded-3xl overflow-hidden transition-all duration-700 transform hover:scale-[1.02] ${theme.calculator} shadow-2xl`}>
          {/* Display Area */}
          <div className={`p-8 ${theme.display} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-black/10"></div>
            <div className="relative text-right space-y-4">
              <div className="h-8 text-xl opacity-90 overflow-hidden truncate font-mono">
                {input || '০'}
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm opacity-90 font-semibold drop-shadow">ফলাফল:</span>
                <div 
                  className={`font-bold break-all text-right transition-all duration-500 drop-shadow-lg ${
                    result ? 'text-green-100' : 'text-blue-50'
                  }`}
                  style={{ 
                    fontSize: result.length > 15 ? '1.5rem' : 
                             result.length > 10 ? '2rem' : '2.5rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  {result || '০'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 flex space-x-4 border-b backdrop-blur-sm" style={{
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={copyToClipboard}
              disabled={!result}
              className={`flex-1 py-4 rounded-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm border ${
                result 
                  ? 'bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white shadow-lg hover:shadow-xl border-indigo-400/30' 
                  : 'bg-gray-400/30 text-gray-500 cursor-not-allowed border-gray-400/30'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-lg">📋</span>
                <span className="font-semibold">কপি</span>
              </span>
            </button>
            <button
              onClick={speakResult}
              disabled={!result || isSpeaking}
              className={`flex-1 py-4 rounded-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm border ${
                result && !isSpeaking
                  ? 'bg-gradient-to-r from-green-500/80 to-teal-500/80 text-white shadow-lg hover:shadow-xl border-green-400/30' 
                  : 'bg-gray-400/30 text-gray-500 cursor-not-allowed border-gray-400/30'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-lg">{isSpeaking ? '🔊' : '🎤'}</span>
                <span className="font-semibold">{isSpeaking ? 'বলছি...' : 'বলুন'}</span>
              </span>
            </button>
          </div>

          {/* Scientific Panel */}
          {isScientific && (
            <ScientificPanel onButtonClick={handleButtonClick} />
          )}

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-4 p-6 lg:p-8">
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
          <div className="w-full lg:w-80 transition-all duration-500">
            <HistoryPanel onClose={() => setShowHistory(false)} />
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className={`relative max-w-7xl mx-auto p-6 mt-8 rounded-3xl backdrop-blur-2xl border z-10 ${
        isDarkMode 
          ? 'bg-gray-800/20 border-gray-700/30 text-gray-300' 
          : 'bg-white/20 border-gray-300/30 text-gray-700'
      } shadow-lg`}>
        <div className="text-center text-lg">
          <strong className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            কীবোর্ড শর্টকাট:
          </strong> 
          <span className="mx-3">Ctrl+S (বৈজ্ঞানিক মোড)</span> • 
          <span className="mx-3">Ctrl+D (ডার্ক মোড)</span> • 
          <span className="mx-3">Ctrl+H (ইতিহাস)</span>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-20">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-500 ${
            showHistory 
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
              : 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
          }`}
        >
          <span className="text-xl">📊</span>
        </button>
      </div>
    </div>
  );
};

export default Calculator;