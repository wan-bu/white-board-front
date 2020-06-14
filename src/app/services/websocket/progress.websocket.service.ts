import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { WebSocketService } from '../websocket/websocket.service';
import { WebSocketOptions } from '../../models/websocket.options';
import { FixedStompConfig } from 'src/app/configs/fixed-stomp-config';
 
export const progressStompConfig: FixedStompConfig = {
  webSocketFactory: () => {
    return new WebSocket('ws://localhost:8090/websocket-kafka');
  }
};
 
@Injectable()
export class ProgressWebsocketService extends WebSocketService {
  constructor(stompService: RxStompService) {
    super(stompService, progressStompConfig, new WebSocketOptions('/topic/positions'));
  }
}