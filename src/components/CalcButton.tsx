import React from 'react';
import {useCalculator} from '../context/CalculatorContext'

interface CalcButtonProps {
  value: string;
  onClick: (value: string) => void;
  type?: 'number' | 'operator' | 'equals' | 'clear' | 'backspace';
  className?: string;
}

const CalcButton: React.FC<CalcButtonProps> = ({ 
  value, 
  onClick, 
  type = 'number',
  className = ''
}) => {
  const { isDarkMode } = useCalculator();
  
  const getButtonStyle = () => {
    const baseStyle = 'w-full h-14 md:h-16 rounded-xl font-bold text-lg transition-all duration-200 transform active:scale-95 ';
    
    switch (type) {
      case 'number':
        return baseStyle + (isDarkMode 
          ? 'bg-gray-700 text-white hover:bg-gray-600' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200');
      
      case 'operator':
        return baseStyle + (isDarkMode 
          ? 'bg-blue-600 text-white hover:bg-blue-500' 
          : 'bg-blue-500 text-white hover:bg-blue-400');
      
      case 'equals':
        return baseStyle + (isDarkMode 
          ? 'bg-green-600 text-white hover:bg-green-500' 
          : 'bg-green-500 text-white hover:bg-green-400');
      
      case 'clear':
        return baseStyle + (isDarkMode 
          ? 'bg-red-600 text-white hover:bg-red-500' 
          : 'bg-red-500 text-white hover:bg-red-400');
      
      case 'backspace':
        return baseStyle + (isDarkMode 
          ? 'bg-yellow-600 text-white hover:bg-yellow-500' 
          : 'bg-yellow-500 text-white hover:bg-yellow-400');
      
      default:
        return baseStyle + (isDarkMode 
          ? 'bg-gray-600 text-white hover:bg-gray-500' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300');
    }
  };

  return (
    <button
      className={getButtonStyle() + ' ' + className}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default CalcButton;