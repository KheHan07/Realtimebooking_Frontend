// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: Subject<string> = new Subject();

  constructor(private stompService: RxStompService) { }

  connect() {
    this.stompService.watch('/topic/ticket-updates').subscribe((message) => {
      this.messages.next(message.body);
    });
  }

  disconnect() {
    this.stompService.deactivate();
  }
}
