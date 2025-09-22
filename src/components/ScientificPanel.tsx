import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';

interface HistoryPanelProps {
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose }) => {
  const { history, clearHistory, setInput, setResult, isDarkMode } = useCalculator();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter history based on search term
  const filteredHistory = history.filter(calc =>
    calc.expression.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const useCalculation = (calculation: { expression: string; result: string }) => {
    setInput(calculation.expression);
    setResult(calculation.result);
    onClose();
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`ml-4 w-80 rounded-2xl shadow-xl overflow-hidden animate-slide-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">গণনার ইতিহাস</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            ✕
          </button>
        </div>
        
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="ইতিহাস খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 pl-8 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            }`}
          />
          <span className="absolute left-2 top-2.5">🔍</span>
        </div>
      </div>

      {/* History List */}
      <div className="h-96 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-center">
              {searchTerm ? 'খুঁজে পাওয়া যায়নি' : 'কোনো ইতিহাস নেই'}
            </p>
            {!searchTerm && (
              <p className="text-sm mt-1 text-center">কিছু গণনা করুন এবং এখানে দেখুন</p>
            )}
          </div>
        ) : (
          <div className="p-2">
            {filteredHistory.map((calc, index) => (
              <div
                key={calc.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => useCalculation(calc)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className={`text-sm font-mono ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {calc.expression}
                    </div>
                    <div className={`text-lg font-bold ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      = {calc.result}
                    </div>
                  </div>
                  <div className={`text-xs text-right ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div>{formatTime(calc.timestamp)}</div>
                    <div>{formatDate(calc.timestamp)}</div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex justify-end space-x-1 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(calc.result);
                    }}
                    className={`text-xs p-1 rounded ${
                      isDarkMode 
                        ? 'bg-gray-600 hover:bg-gray-500' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    title="ফলাফল কপি করুন"
                  >
                    📋
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {history.length > 0 && (
        <div className={`p-3 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex justify-between space-x-2">
            <button
              onClick={clearHistory}
              className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-red-500 hover:bg-red-400 text-white'
              }`}
            >
              সব মুছুন
            </button>
            <button
              onClick={() => {
                const historyText = history.map(calc => 
                  `${calc.expression} = ${calc.result}`
                ).join('\n');
                navigator.clipboard.writeText(historyText);
              }}
              className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
            >
              সব কপি করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;