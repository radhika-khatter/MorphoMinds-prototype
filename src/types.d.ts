interface SpeechRecognition extends EventTarget {
    // ... (all the interface declarations from above)
  }
  
  declare global {
    interface Window {
      webkitSpeechRecognition: typeof SpeechRecognition;
      SpeechRecognition: typeof SpeechRecognition;
    }
  }