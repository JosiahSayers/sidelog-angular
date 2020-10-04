export interface LogRequest {
  message: string;
  json?: object;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'trace';
