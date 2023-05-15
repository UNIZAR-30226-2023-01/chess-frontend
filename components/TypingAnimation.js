import React, { useEffect, useState } from 'react';

export default function TypingAnimation({ text, typingSpeed }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let timer;

    const animateText = () => {
      setDisplayText(text.slice(0, currentIndex));

      if (currentIndex < text.length) {
        timer = setTimeout(() => {
          currentIndex++;
          animateText();
        }, typingSpeed); // Velocidad de escritura en milisegundos
      }
    };

    animateText();

    return () => clearTimeout(timer);
  }, [text, typingSpeed]);

  return <>{displayText}</>;
}
