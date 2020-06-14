import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  },
];
@NgModule({
  declarations: [

  ],
  imports: [
  ],
  providers: [
  
  ],
  entryComponents: [
 
  ]
})
export class WhiteBoardModule { }
