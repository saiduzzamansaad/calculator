import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import { CalculatorProvider } from './context/CalculatorContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'calculator'>('landing');

  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {currentPage === 'landing' ? (
          <LandingPage onNavigate={() => setCurrentPage('calculator')} />
        ) : (
          <Calculator onNavigate={() => setCurrentPage('landing')} />
        )}
      </div>
    </CalculatorProvider>
  );
}

export default App;