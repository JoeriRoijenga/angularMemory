import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadBarComponent } from './load-bar/load-bar.component';
import { ScoreComponent } from './score.component';

@NgModule({
  declarations: [LoadBarComponent, ScoreComponent],
  exports: [
    ScoreComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ScoreModule { }
