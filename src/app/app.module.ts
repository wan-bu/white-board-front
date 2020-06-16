import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './modules/white-board/components/board/board.component';
import { WhiteBoardModule } from './modules/white-board/white-board.module';
import { RxStompService  } from '@stomp/ng2-stompjs';
import { ProgressWebsocketService } from './services/websocket/progress.websocket.service';
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
    RxStompService,
    ProgressWebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
