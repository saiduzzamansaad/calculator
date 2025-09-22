import React, { useState, useEffect } from 'react';

interface VoiceInputProps {
  onResult: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!supported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'bn-BD';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!supported) {
    return null;
  }

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className={`p-3 rounded-full transition-colors ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      title="ভয়েস ইনপুট"
    >
      {isListening ? '🎤...' : '🎤'}
    </button>
  );
};

export default VoiceInput;