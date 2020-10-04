import { InjectionToken } from '@angular/core';

export interface SidelogConfig {
  clientId: string;
  postLogUrl: string;
  timesToRetryFailedApiCalls: number;
  logToConsole: boolean;
  logToApi: boolean;
};

export const sidelogConfigInjectionToken = new InjectionToken('sidelog-config');
