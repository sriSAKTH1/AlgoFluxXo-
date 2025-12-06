export enum GeminiModel {
  FLASH_LITE = 'gemini-flash-lite-latest',
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview',
  TTS = 'gemini-2.5-flash-preview-tts',
  LIVE = 'gemini-2.5-flash-native-audio-preview-09-2025',
  IMAGE = 'gemini-3-pro-image-preview'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean; // If true, it was a thinking model response
}

export interface StackOperation {
  type: 'PUSH' | 'POP' | 'CLEAR';
  value?: string | number;
  timestamp: Date;
}

// Audio Types
export interface AudioChunk {
  data: Uint8Array;
  sampleRate: number;
}
