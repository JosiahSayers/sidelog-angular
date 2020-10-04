import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogLevel, LogRequest } from './log-request';
import { SidelogConfig, sidelogConfigInjectionToken } from './sidelog-config';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidelogService {

  private apiCallOptions: { headers: HttpHeaders };

  constructor(
    @Inject(sidelogConfigInjectionToken) private config: SidelogConfig,
    private http: HttpClient
  ) {
    this.apiCallOptions = {
      headers: new HttpHeaders({
        clientId: this.config.clientId
      })
    };
  }

  debug(req: LogRequest): void {
    this.sendLog({ ...req, level: 'debug' });
  }

  info(req: LogRequest): void {
    this.sendLog({ ...req, level: 'info' });
  }

  warn(req: LogRequest): void {
    this.sendLog({ ...req, level: 'warn' });
  }

  error(req: LogRequest): void {
    this.sendLog({ ...req, level: 'error' });
  }

  fatal(req: LogRequest): void {
    this.sendLog({ ...req, level: 'fatal' });
  }

  trace(req: LogRequest): void {
    this.sendLog({ ...req, level: 'trace' });
  }

  private sendLog(logReq: LogRequest & { level: LogLevel }): void {
    this.logToConsole(logReq);
    this.logToApi(logReq);
  }

  private logToConsole(logReq: LogRequest & { level: LogLevel }): void {
    if (this.config.logToConsole) {
      const consoleFunctionName = logReq.level === 'fatal' ? 'error' : logReq.level;
      console[consoleFunctionName](logReq);
    }
  }

  private logToApi(logReq: LogRequest & { level: LogLevel }): void {
    if (this.config.logToApi) {
      this.http.post(this.config.postLogUrl, logReq, this.apiCallOptions).pipe(
        retry(this.config.timesToRetryFailedApiCalls)
      ).subscribe();
    }
  }
}
