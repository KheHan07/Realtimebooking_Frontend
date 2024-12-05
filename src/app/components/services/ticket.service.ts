// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8080/ticket';

  constructor(private http: HttpClient) { }

  configureSystem(configData: any) {
    return this.http.post(`${this.baseUrl}/configure`, configData, { responseType: 'text' });
  }

  setVendorsAndBuyers(dto: any) {
    return this.http.post(`${this.baseUrl}/set-vendors-buyers`, dto, { responseType: 'text' });
  }

  startSystem(startConfig: any) {
    return this.http.post(`${this.baseUrl}/start`, startConfig, { responseType: 'text' });
  }

  stopSystem() {
    return this.http.post(`${this.baseUrl}/stop`, {}, { responseType: 'text' });
  }
}
