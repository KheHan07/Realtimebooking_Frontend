// src/app/components/configuration-form/configuration-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Configuration {
  name: string;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

@Component({
  selector: 'app-configuration-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css']
})
export class ConfigurationFormComponent implements OnInit {
  name: string = '';
  totalTickets: number = 150;
  ticketReleaseRate: number = 5;
  customerRetrievalRate: number = 3;
  maxTicketCapacity: number = 100;

  savedConfigurations: Configuration[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadConfigurations();
  }

  configureTicketingSystem() {
    console.log('Configuring ticketing system...');
    const configData = {
      totalTickets: this.totalTickets,
      ticketReleaseRate: this.ticketReleaseRate,
      customerRetrievalRate: this.customerRetrievalRate,
      maxTicketCapacity: this.maxTicketCapacity,
    };

    this.http
      .post('http://localhost:8080/ticket/configure', configData, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log('Configuration successful:', response);
          alert('Configuration successful!');
        },
        error: (err) => {
          console.error('Configuration failed:', err);
          alert('Configuration failed: ' + err.message);
        },
      });
  }

  saveConfiguration() {
    if (!this.name) {
      alert('Please enter a name for the configuration.');
      return;
    }

    const newConfig: Configuration = {
      name: this.name,
      totalTickets: this.totalTickets,
      ticketReleaseRate: this.ticketReleaseRate,
      customerRetrievalRate: this.customerRetrievalRate,
      maxTicketCapacity: this.maxTicketCapacity,
    };

    // Check if configuration with the same name exists
    const existingIndex = this.savedConfigurations.findIndex(
      (config) => config.name === this.name
    );

    if (existingIndex !== -1) {
      // Update existing configuration
      this.savedConfigurations[existingIndex] = newConfig;
    } else {
      // Add new configuration
      this.savedConfigurations.push(newConfig);
    }

    // Save to localStorage
    localStorage.setItem(
      'savedConfigurations',
      JSON.stringify(this.savedConfigurations)
    );

    alert('Configuration saved successfully!');
    this.name = ''; // Clear the name field
  }

  loadConfigurations() {
    const configs = localStorage.getItem('savedConfigurations');
    if (configs) {
      this.savedConfigurations = JSON.parse(configs);
    }
  }

  selectConfiguration(config: Configuration) {
    this.name = config.name;
    this.totalTickets = config.totalTickets;
    this.ticketReleaseRate = config.ticketReleaseRate;
    this.customerRetrievalRate = config.customerRetrievalRate;
    this.maxTicketCapacity = config.maxTicketCapacity;
  }

  deleteConfiguration(config: Configuration) {
    this.savedConfigurations = this.savedConfigurations.filter(
      (c) => c.name !== config.name
    );
    localStorage.setItem(
      'savedConfigurations',
      JSON.stringify(this.savedConfigurations)
    );
    alert('Configuration deleted successfully!');
  }
}
