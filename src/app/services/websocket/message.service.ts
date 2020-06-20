import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Point } from 'src/app/modules/white-board/models/point';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor() {
    // this.initializeWebSocketConnection();
  }
  public stompClient;
  isConnected:boolean=false;

  private point = new BehaviorSubject<Point>(new Point(0, 0));
  data = this.point.asObservable();


  updatedDataSelection(data: Point) {
    this.point.next(data);
  }


  initializeWebSocketConnection() : boolean{
    const serverUrl = 'http://localhost:8090/websocket-kafka';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.isConnected=true;
      that.stompClient.subscribe('/topic/positions', (data) => {
        that.updatedDataSelection(JSON.parse(data.body));
      });
    });
    return this.isConnected;
  }

  sendMessage(message) {
    this.stompClient.send('/app/positions', {}, JSON.stringify(message));
  }
}
