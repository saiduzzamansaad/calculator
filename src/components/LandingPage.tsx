import React from 'react';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-blue-800 mb-6">
          বাংলা ক্যালকুলেটর
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          একটি সহজ কিন্তু স্মার্ট ক্যালকুলেটর, যা বাংলা ভাষায় কাজ করবে
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔢</div>
            <h3 className="text-xl font-semibold mb-2">বাংলা সংখ্যা ইনপুট</h3>
            <p className="text-gray-600">বাংলা সংখ্যা ব্যবহার করে গণনা করুন</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">রেসপনসিভ ডিজাইন</h3>
            <p className="text-gray-600">মোবাইল ও ডেস্কটপে সুন্দরভাবে কাজ করে</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">বেশি ফিচার</h3>
            <p className="text-gray-600">শতকরা, দশমিক, কীবোর্ড সাপোর্ট</p>
          </div>
        </div>
        
        <button 
          onClick={onNavigate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
        >
          ক্যালকুলেটর ব্যবহার করুন
        </button>
        
        <div className="mt-12 text-gray-600">
          <p>যোগ, বিয়োগ, গুণ, ভাগ - সহজেই করুন সব গণনা</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;