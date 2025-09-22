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
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: '🎤',
      title: 'ভয়েস ইনপুট',
      description: 'কথা বলেই গণনা করুন, টাইপ করার প্রয়োজন নেই',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: '⚡',
      title: 'দ্রুত গণনা',
      description: 'কীবোর্ড শর্টকাট সহ লাইটনিং ফাস্ট স্পিড',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '📊',
      title: 'বৈজ্ঞানিক মোড',
      description: 'ত্রিকোণমিতি, লগারিদম ও উন্নত ফাংশন',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🌓',
      title: 'স্মার্ট থিম',
      description: 'অটো ডার্ক/লাইট মোড সহ চোখের আরাম',
      gradient: 'from-gray-600 to-blue-600'
    },
    {
      icon: '📱',
      title: 'ফুলি রেসপনসিভ',
      description: 'মোবাইল, ট্যাবলেট, ডেস্কটপ - সবত্র পারফেক্ট',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: '💾',
      title: 'ইতিহাস সেভ',
      description: 'গণনার ইতিহাস সংরক্ষণ ও পুনরায় ব্যবহার',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '🎨',
      title: 'মডার্ন UI',
      description: 'গ্লাস মরফিজম ও স্মুদ অ্যানিমেশন',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '১০০%', label: 'বাংলা সাপোর্ট' },
    { number: '৫০+', label: 'গাণিতিক ফাংশন' },
    { number: '২৪/৭', label: 'ব্যবহারের উপযোগী' },
    { number: '∞', label: 'মুক্ত সফটওয়্যার' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative py-8 px-4 lg:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl backdrop-blur-lg border ${
                isDarkMode 
                  ? 'bg-black/30 border-gray-700' 
                  : 'bg-white/30 border-gray-200'
              } shadow-lg`}>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🧮
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  বাংলা ক্যালকুলেটর
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Smart Calculator for Bengali Users
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-black/30 border-yellow-400/30 text-yellow-300' 
                    : 'bg-white/30 border-gray-300 text-gray-700'
                } shadow-lg`}
              >
                <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
              </button>
              
              <button 
                onClick={onNavigate}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>ক্যালকুলেটর</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 lg:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full backdrop-blur-lg border mb-6 ${
              isDarkMode 
                ? 'bg-black/20 border-purple-400/30' 
                : 'bg-white/20 border-blue-400/30'
            }`}>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                বাংলায় প্রথম স্মার্ট ক্যালকুলেটর
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              গণিত হোক{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  সহজ
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 animate-pulse"></div>
              </span>
              {' '}ও{' '}
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                সুন্দর
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                বাংলা ভাষায় সম্পূর্ণভাবে কাজ করে এমন আধুনিক ক্যালকুলেটর। 
                সাধারণ গণনা থেকে শুরু করে বৈজ্ঞানিক গবেষণা পর্যন্ত সবকিছু বাংলায়।
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button 
                onClick={onNavigate}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>এখনই চেষ্টা করুন</span>
                  <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              
              <button className={`group border-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-lg ${
                isDarkMode 
                  ? 'border-purple-400 text-purple-300 hover:bg-purple-400/10' 
                  : 'border-blue-400 text-blue-600 hover:bg-blue-400/10'
              }`}>
                <span className="flex items-center justify-center space-x-2">
                  <span>ভিডিও ডেমো</span>
                  <span className="group-hover:scale-110 transition-transform">🎬</span>
                </span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-lg border text-center transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-black/20 border-gray-700' 
                    : 'bg-white/20 border-gray-200'
                } shadow-lg`}
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm font-medium mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Calculator Preview */}
          <div className="relative max-w-2xl mx-auto">
            <div className={`rounded-3xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-500 shadow-2xl ${
              isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700' : 'bg-white/50 backdrop-blur-lg border border-gray-200'
            }`}>
              <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white">
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-2">১২৩.৪৫ + ৬৭৮.৯০</div>
                  <div className="text-3xl font-bold tracking-wider">৮০২.৩৫</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 p-6">
                {['C', '⌫', '%', '÷', '৭', '৮', '৯', '×', '৪', '৫', '৬', '-', '১', '২', '৩', '+', '±', '০', '.', '='].map((btn) => (
                  <button 
                    key={btn}
                    className={`p-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      ['=', '÷', '×', '-', '+'].includes(btn)
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-700/50 hover:bg-gray-600/50 text-white'
                          : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce animation-delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 lg:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                অসাধারণ বৈশিষ্ট্য
              </span>
            </h3>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              আধুনিক প্রযুক্তি ও ব্যবহারকারী অভিজ্ঞতার পারফেক্ট কম্বিনেশন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative rounded-3xl p-6 backdrop-blur-lg border transition-all duration-500 hover:scale-105 overflow-hidden ${
                  isDarkMode 
                    ? 'bg-black/20 border-gray-700' 
                    : 'bg-white/20 border-gray-200'
                } shadow-lg`}
              >
                <div className="relative z-10">
                  <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 lg:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`rounded-3xl p-8 lg:p-12 backdrop-blur-lg border ${
            isDarkMode 
              ? 'bg-black/30 border-purple-500/30' 
              : 'bg-white/30 border-blue-500/30'
          } shadow-2xl`}>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              প্রস্তুত আপনার গণনার যাত্রা শুরু করতে?
            </h3>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              এখনই বাংলা ক্যালকুলেটর ব্যবহার করুন এবং অভিজ্ঞতা করুন বাংলায় গণনার সহজতা
            </p>
            <button 
              onClick={onNavigate}
              className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              শুরু করুন আপনার গণনা 🎯
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative py-12 px-4 lg:px-6 border-t ${
        isDarkMode 
          ? 'border-gray-800 bg-black/20' 
          : 'border-gray-200 bg-white/20'
      } backdrop-blur-lg z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-xl">
                🧮
              </div>
              <div>
                <div className="font-bold text-lg">বাংলা ক্যালকুলেটর</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Made with ❤️ for Bengali Community
                </div>
              </div>
            </div>
            
            <div className={`text-center lg:text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="text-sm">© ২০২৪ বাংলা ক্যালকুলেটর | সকল অধিকার সংরক্ষিত</div>
              <div className="text-xs mt-1">ভার্সন ২.০ | সম্পূর্ণ মুক্ত সফটওয়্যার</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;