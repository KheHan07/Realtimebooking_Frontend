// src/app/components/web-socket-window/web-socket-window.component.ts
import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from '../../my-rx-stomp.config';

@Component({
  selector: 'app-web-socket-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-socket-window.component.html',
  styleUrls: ['./web-socket-window.component.css'],
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
export class WebSocketWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  liveData: string[] = [];
  private subscription: Subscription = new Subscription();

  // Reference to the live data container
  @ViewChild('liveDataContainer') private liveDataContainer!: ElementRef;

  private shouldScroll = false;

  constructor(private rxStompService: RxStompService) {}

  ngOnInit() {
    this.subscription = this.rxStompService
      .watch('/topic/ticket-updates')
      .subscribe((message) => {
        console.log('Received message:', message.body);
        this.liveData.push(message.body);
        this.shouldScroll = true; // Indicate that we should scroll after the view updates
      });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private scrollToBottom(): void {
    try {
      this.liveDataContainer.nativeElement.scrollTop = this.liveDataContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }
}
