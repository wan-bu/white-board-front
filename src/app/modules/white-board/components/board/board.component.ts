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

  oldPoint: Point = new Point(0, 0);

  isConnected: boolean = false;

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  click(event) {
    this.isMouseDown = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    this.oldPoint.posX = x;
    this.oldPoint.posY = y;
    let newPoint = new Point(x, y);
    newPoint.isClick = this.isMouseDown;
    this.draw(newPoint);
    if (this.isConnected) {
      this.boardService.sendPoint(newPoint);
    }
  }

  trace(event) {
    if (this.isMouseDown) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("x: " + x + " y: " + y);
      let newPoint = new Point(x, y);
      newPoint.isClick = false;
      this.draw(newPoint);
      if (this.isConnected) {
        this.boardService.sendPoint(newPoint);
      }
    }
  }


  release(event) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
    }
  }

  draw(point: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.oldPoint.posX, this.oldPoint.posY);
    this.ctx.lineTo(point.posX, point.posY);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.getRandomColor();
    this.ctx.stroke();
    this.oldPoint.posX = point.posX;
    this.oldPoint.posY = point.posY;
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  connect() {
    this.boardService.connect();
    this.oldPoint = new Point(0, 0);
    this.boardService.loadNewPoints();
    this.boardService.data.subscribe(loadedPoint => {
      if ((this.oldPoint.posX == 0 && this.oldPoint.posY == 0) || loadedPoint.isClick) {
        this.oldPoint.posX = loadedPoint.posX;
        this.oldPoint.posY = loadedPoint.posY;
      }
      if (loadedPoint.isCleaning) {
        this.cleanCanvas();
      }
      this.draw(loadedPoint);
    });
    this.isConnected = true;
  }

  disconnect() {
    this.boardService.disconnect();
    this.isConnected = false;
  }
  clean() {
    this.oldPoint = new Point(0, 0);
    let newPoint = new Point(0, 0);
    newPoint.isCleaning = true;
    newPoint.isClick = true;
    this.cleanCanvas();
    this.boardService.sendPoint(newPoint);
  }
  cleanCanvas() {
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.fill();
  }
}
