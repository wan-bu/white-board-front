import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { Point } from '../../models/point';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private boardService: BoardService) { }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  isMouseDown: boolean = false;
  oldPosX: number = 0;
  oldPosY: number = 0;

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.boardService.loadNewPoints();
    this.boardService.data.subscribe(loadedPoint => {
      if (this.oldPosX == 0 && this.oldPosY == 0) {
        this.oldPosX = loadedPoint.posX;
        this.oldPosY = loadedPoint.posY;
      }
      this.draw(loadedPoint);
      console.log("ha7na dkhelna a hbiba !>>>> ", loadedPoint)
    });
  }

  click(event) {
    this.isMouseDown = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    this.oldPosX = x;
    this.oldPosY = y;
    let point = new Point(x, y);
    this.draw(point);
    this.boardService.sendPoint(point);
  }

  trace(event) {
    if (this.isMouseDown) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("x: " + x + " y: " + y);
      let point = new Point(x, y);
      this.draw(point);
      this.boardService.sendPoint(point);
    }
  }


  release(event) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
    }
  }

  draw(point: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.oldPosX, this.oldPosY);
    this.ctx.lineTo(point.posX, point.posY);
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.oldPosX = point.posX;
    this.oldPosY = point.posY;
  }

}
