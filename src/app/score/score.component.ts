import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public found: number = 0;
  public time: number = 0;
  private intervalID: number;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.currentFound.subscribe(found => this.found = found);
    this.appService.startTime.subscribe(timeEvent => {
      switch (timeEvent) {
        case 0:
          this.resetTime();
          break;
        case 1:
          this.startTime()
          break;
        case 2:
          this.stopTime();
          this.appService.changeScore(this.time);
          break;
      }
    });
  }

  private startTime(): void {
    this.intervalID = setInterval(() => {
      this.time++;
      this.appService.currentTimeChange(this.time);
    }, 1000);
  }

  private stopTime(): void {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  private resetTime(): void {
    this.stopTime();
    this.time = 0;
  }
}
