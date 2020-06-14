import { Injectable } from '@angular/core';
import { ProgressWebsocketService } from 'src/app/services/websocket/progress.websocket.service';
import { Point } from '../../models/point';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private point = new BehaviorSubject<Point>(new Point(0,0));
  data = this.point.asObservable();


  updatedDataSelection(data: Point){
    this.point.next(data);
  }

  constructor(private progressWebsocketService: ProgressWebsocketService) {

  }

  public loadNewPoints() : Point {
    var point : any;
    this.progressWebsocketService.getObservable().subscribe((data) => {
      console.log("load new point ======> ", data)
      point= data.message;
      this.updatedDataSelection(point);
    }
    );
    return point;
  }

  public sendPoint(point:Point)  {
    this.progressWebsocketService.senMessage(point);
  }
}
