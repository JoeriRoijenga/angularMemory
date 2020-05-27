import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';
import { ScoreModule } from "./score/score.module";
import { BoardModule } from "./board/board.module";
import {AppService} from "./app.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SettingsModule,
    ScoreModule,
    BoardModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
