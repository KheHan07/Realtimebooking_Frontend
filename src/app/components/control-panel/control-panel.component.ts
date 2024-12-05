import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebSocketWindowComponent } from '../web-socket-window/web-socket-window.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [FormsModule, CommonModule, WebSocketWindowComponent],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'] 
})

export class ControlPanelComponent {
  numberOfVendors: number = 2;
  numberOfBuyers: number = 3;

  constructor(private http: HttpClient) {}

  setVendorsAndBuyers() {
    const dto = {
      numberOfVendors: this.numberOfVendors,
      numberOfBuyers: this.numberOfBuyers,
    };
    this.http
      .post('http://localhost:8080/ticket/set-vendors-buyers', dto, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          alert('Vendors and buyers updated successfully!');
        },
        error: (err) => {
          alert('Failed to update vendors and buyers: ' + err.message);
        },
      });
  }

  startSystem() {
    const startConfig = {
      numberOfVendors: this.numberOfVendors,
      numberOfBuyers: this.numberOfBuyers,
    };
    this.http
      .post('http://localhost:8080/ticket/start', startConfig, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          alert('System started successfully!');
        },
        error: (err) => {
          alert('Failed to start system: ' + err.message);
        },
      });
  }

  stopSystem() {
    this.http
      .post('http://localhost:8080/ticket/stop', {}, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert('System stopped successfully!');
        },
        error: (err) => {
          alert('Failed to stop system: ' + err.message);
        },
      });
  }
}
