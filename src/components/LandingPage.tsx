import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { isDarkMode, toggleDarkMode } = useCalculator();

  const features = [
    {
      icon: '🔢',
      title: 'বাংলা সংখ্যা ইনপুট',
      description: 'বাংলা সংখ্যা ব্যবহার করে সহজে গণনা করুন',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '⚡',
      title: 'দ্রুত গণনা',
      description: 'কীবোর্ড ও ভয়েস সাপোর্ট সহ দ্রুত কাজ করুন',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📊',
      title: 'বৈজ্ঞানিক মোড',
      description: 'ত্রিকোণমিতি, লগারিদম ও অন্যান্য ফাংশন',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🌙',
      title: 'ডার্ক মোড',
      description: 'চোখের জন্য আরামদায়ক ডার্ক থিম',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '📱',
      title: 'রেসপনসিভ ডিজাইন',
      description: 'সব ডিভাইসে পারফেক্টভাবে কাজ করে',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: '💾',
      title: 'ইতিহাস সংরক্ষণ',
      description: 'পূর্বের গণনাগুলো দেখুন এবং পুনরায় ব্যবহার করুন',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      {/* Header */}
      <header className="relative py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-2xl">
              🧮
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              বাংলা ক্যালকুলেটর
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <button 
              onClick={onNavigate}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ক্যালকুলেটর ব্যবহার করুন →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            একটি <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">স্মার্ট</span> এবং <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">সহজ</span> বাংলা ক্যালকুলেটর
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            বাংলা ভাষায় সম্পূর্ণভাবে কাজ করে এমন আধুনিক ক্যালকুলেটর। যোগ, বিয়োগ, গুণ, ভাগ থেকে শুরু করে বৈজ্ঞানিক গণনা পর্যন্ত সবকিছু বাংলায়।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={onNavigate}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              শুরু করুন 🚀
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
              বৈশিষ্ট্য দেখুন
            </button>
          </div>

          {/* Calculator Preview */}
          <div className="relative max-w-md mx-auto">
            <div className={`rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <div className="text-right">
                  <div className="text-sm opacity-80">১২৩ + ৪৫৬</div>
                  <div className="text-2xl font-bold">৫৭৯</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {['৭', '৮', '৯', '+', '৪', '৫', '৬', '-', '১', '২', '৩', '×', '০', '.', '=', '÷'].map((btn) => (
                  <button key={btn} className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">আমাদের বৈশিষ্ট্যসমূহ</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-6 text-white bg-gradient-to-br ${feature.color} transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            তৈরি হয়েছে বাংলা ভাষাপ্রেমীদের জন্য ❤️ | © ২০২৪ বাংলা ক্যালকুলেটর
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;