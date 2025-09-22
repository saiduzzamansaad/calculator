import React, { useState, useEffect, useCallback } from 'react';

interface CalculatorProps {
  onNavigate: () => void;
}

interface Calculation {
  expression: string;
  result: string;
}

const Calculator: React.FC<CalculatorProps> = ({ onNavigate }) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Bengali numbers mapping
  const banglaNumbers: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.'
  };

  // Convert English numbers to Bengali
  const toBanglaNumber = (num: string): string => {
    return num.split('').map(char => banglaNumbers[char] || char).join('');
  };

  // Convert Bengali numbers to English for calculation
  const toEnglishNumber = (num: string): string => {
    const englishNumbers: { [key: string]: string } = {
      '০': '0',
      '১': '1',
      '২': '2',
      '৩': '3',
      '৪': '4',
      '৫': '5',
      '৬': '6',
      '৭': '7',
      '৮': '8',
      '৯': '9',
      '.': '.'
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
    } else {
      // For numbers and operators, add to input
      setInput(prev => prev + value);
    }
  };

  // Calculate the result
  const calculateResult = useCallback(() => {
    try {
      // Convert Bengali numbers to English for calculation
      let expression = toEnglishNumber(input);
      
      // Replace Bengali operators with JavaScript operators
      expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Evaluate the expression
      const calculatedResult = eval(expression);
      
      // Format the result
      const formattedResult = Number.isInteger(calculatedResult) 
        ? calculatedResult.toString() 
        : calculatedResult.toFixed(2);
      
      // Convert to Bengali and set the result
      const banglaResult = toBanglaNumber(formattedResult);
      setResult(banglaResult);
      
      // Save to history
      const newCalculation: Calculation = {
        expression: input,
        result: banglaResult
      };
      
      setHistory(prev => [newCalculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
    } catch (error) {
      setResult('ত্রুটি');
    }
  }, [input]);

  // Handle percentage calculation
  const handlePercentage = () => {
    try {
      // Convert Bengali numbers to English for calculation
      let expression = toEnglishNumber(input);
      
      // If the last character is an operator, remove it
      if (['+', '-', '*', '/', '×', '÷'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      
      // Calculate percentage
      const parts = expression.split(/[\+\-\*\/]/);
      const lastNumber = parseFloat(parts[parts.length - 1]);
      const percentage = lastNumber / 100;
      
      // Replace the last number with its percentage
      const newExpression = expression.slice(0, expression.lastIndexOf(parts[parts.length - 1])) + percentage;
      
      // Convert back to Bengali and update input
      setInput(toBanglaNumber(newExpression).replace(/\*/g, '×').replace(/\//g, '÷'));
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick]);

  // Copy result to clipboard
  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert('ফলাফল কপি করা হয়েছে!');
    }
  };

  // Button component for reusability
  interface CalcButtonProps {
    value: string;
    onClick: (value: string) => void;
    className?: string;
    colSpan?: number;
  }

  const CalcButton: React.FC<CalcButtonProps> = ({ 
    value, 
    onClick, 
    className = '', 
    colSpan = 1 
  }) => {
    return (
      <button
        className={`flex items-center justify-center p-4 text-xl font-medium rounded-lg transition-all duration-200 hover:bg-opacity-80 active:scale-95 ${className} ${colSpan === 2 ? 'col-span-2' : ''}`}
        onClick={() => onClick(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button 
        onClick={onNavigate}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← ল্যান্ডিং পেজে ফিরে যান
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Display Area */}
        <div className="p-4 bg-gray-800 text-white">
          <div className="text-right">
            <div className="h-8 text-lg text-gray-400 overflow-hidden whitespace-nowrap">
              {input || '০'}
            </div>
            <div className={`flex justify-between items-end ${result ? 'min-h-[3rem]' : 'min-h-[3rem]'}`}>
              <span className="text-sm text-gray-400">ফলাফল:</span>
              <div 
                className={`text-3xl font-bold break-all text-right ${result ? 'text-green-400' : 'text-gray-300'}`}
                style={{ fontSize: result.length > 10 ? '1.5rem' : '2rem' }}
              >
                {result || '০'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100">
          <CalcButton 
            value="C" 
            onClick={handleButtonClick} 
            className="bg-red-500 text-white" 
          />
          <CalcButton 
            value="⌫" 
            onClick={handleButtonClick} 
            className="bg-yellow-500 text-white" 
          />
          <CalcButton 
            value="%" 
            onClick={handleButtonClick} 
            className="bg-blue-500 text-white" 
          />
          <CalcButton 
            value="÷" 
            onClick={handleButtonClick} 
            className="bg-blue-500 text-white" 
          />
          
          <CalcButton value="৭" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="৮" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="৯" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="×" onClick={handleButtonClick} className="bg-blue-500 text-white" />
          
          <CalcButton value="৪" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="৫" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="৬" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="-" onClick={handleButtonClick} className="bg-blue-500 text-white" />
          
          <CalcButton value="১" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="২" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="৩" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="+" onClick={handleButtonClick} className="bg-blue-500 text-white" />
          
          <CalcButton 
            value="ইতিহাস" 
            onClick={() => setShowHistory(!showHistory)} 
            className="bg-purple-500 text-white" 
            colSpan={1}
          />
          <CalcButton value="০" onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton value="." onClick={handleButtonClick} className="bg-white text-gray-800" />
          <CalcButton 
            value="=" 
            onClick={handleButtonClick} 
            className="bg-green-500 text-white" 
          />
        </div>
        
        {/* Copy Result Button */}
        {result && (
          <div className="p-4 bg-gray-100 border-t">
            <button
              onClick={copyToClipboard}
              className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              ফলাফল কপি করুন
            </button>
          </div>
        )}
      </div>
      
      {/* History Sidebar */}
      {showHistory && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-4 overflow-y-auto z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">গণনার ইতিহাস</h2>
            <button 
              onClick={() => setShowHistory(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-4">কোনো ইতিহাস নেই</p>
          ) : (
            <ul className="space-y-3">
              {history.map((calc, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600">{calc.expression}</div>
                  <div className="font-bold text-lg">= {calc.result}</div>
                </li>
              ))}
            </ul>
          )}
          
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              ইতিহাস মুছুন
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculator;