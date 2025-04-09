// For TypeScript to understand SpeechRecognition
declare global {
    interface Window {
      webkitSpeechRecognition: any;
      SpeechRecognition: any;
    }
  }
  