import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { BoardModule } from './board/board.module';
import { ScoreModule } from './score/score.module';
import { SettingsModule } from './settings/settings.module';
import { GameComponent } from './game.component';


@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    BoardModule,
    ScoreModule,
    SettingsModule
  ],
  exports: [
    GameComponent
  ],
  providers: [GameService]
})
export class GameModule { }
