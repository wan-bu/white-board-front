import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  down : boolean = false;
  posX:number=0;
  posY:number=0;
  
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
  }
  click(event){
    this.down=true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    this.posX=x;
    this.posY=y;
    this.draw(x,y);
  }

  trace(event){
    if(this.down){
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("x: " + x + " y: " + y);
      this.draw(x,y);
    }
  }
  release(event){
    if(this.down){
      this.down=false;
    }
  }

  draw(x,y){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.posX=x;
    this.posY=y;
  }
}
