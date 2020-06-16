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
    this.initializeWebSocketConnection();
  }
  public stompClient;

  private point = new BehaviorSubject<Point>(new Point(0, 0));
  data = this.point.asObservable();


  updatedDataSelection(data: Point) {
    this.point.next(data);
  }


  initializeWebSocketConnection() {
    const serverUrl = 'http://10.218.170.193:8090/websocket-kafka';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic/positions', (data) => {
        this.updatedDataSelection(data.message);
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/positions', {}, JSON.stringify(message));
  }
}
