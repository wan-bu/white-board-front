import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './modules/white-board/components/board/board.component';
import { WhiteBoardModule } from './modules/white-board/white-board.module';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WhiteBoardModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
