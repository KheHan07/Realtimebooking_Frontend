// src/app/my-rx-stomp.config.ts
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import SockJS from 'sockjs-client';



export const myRxStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => {
    return new SockJS('http://localhost:8080/ticket-updates');
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
