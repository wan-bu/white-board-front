import { Injectable } from '@angular/core';
import { Point } from '../../models/point';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'src/app/services/websocket/message.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private point = new BehaviorSubject<Point>(new Point(0,0));
  data = this.point.asObservable();


  updatedDataSelection(data: Point){
    this.point.next(data);
  }

  constructor(
    private messageService : MessageService) {

  }

  public loadNewPoints() : Point {
    var point : any;
    this.messageService.data.subscribe((data) => {
      console.log("load new point ======> ", data)
      point= data;
      this.updatedDataSelection(point);
    }
    );
    return point;
  }

  public sendPoint(point:Point)  {
    this.messageService.sendMessage(point);
  }
}
