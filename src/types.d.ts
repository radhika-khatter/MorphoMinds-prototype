declare global {
    interface Window {
      webkitSpeechRecognition: any;
      SpeechRecognition: any;
    }
  
    interface SpeechRecognition extends EventTarget {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      start(): void;
      stop(): void;
      abort(): void;
      onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
      onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
      onend: ((this: SpeechRecognition, ev: Event) => any) | null;
      onerror: ((this: SpeechRecognition, ev: any) => any) | null;
      onnomatch: ((this: SpeechRecognition, ev: any) => any) | null;
      onresult: ((this: SpeechRecognition, ev: any) => any) | null;
      onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
      onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
      onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
      onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
      onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    }
  }
  