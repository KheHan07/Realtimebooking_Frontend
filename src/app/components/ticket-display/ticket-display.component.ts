import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from '../../my-rx-stomp.config';

interface VendorStats {
  vendorId: number;
  ticketsReleased: number;
}

@Component({
  selector: 'app-ticket-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-display.component.html',
  styleUrls: ['./ticket-display.component.css'],
  providers: [
    {
      provide: RxStompService,
      useFactory: () => {
        const rxStompService = new RxStompService();
        rxStompService.configure(myRxStompConfig);
        rxStompService.activate();
        return rxStompService;
      },
    },
  ],
})
export class TicketDisplayComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  
  vendorStats: VendorStats[] = [];
  customersTotalBought: number = 0;
  totalTicketsSoldOut: number = 0;

  constructor(private rxStompService: RxStompService) {}

  ngOnInit() {
    this.subscription = this.rxStompService
      .watch('/topic/ticket-updates')
      .subscribe((message) => {
        try {
          const data = JSON.parse(message.body);
          // If the message contains stats
          if (data.vendorStats && data.customersTotalBought !== undefined && data.totalTicketsSoldOut !== undefined) {
            this.vendorStats = data.vendorStats;
            this.customersTotalBought = data.customersTotalBought;
            this.totalTicketsSoldOut = data.totalTicketsSoldOut;
          }
        } catch (e) {
          // If it's not a JSON stats message, just ignore
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
