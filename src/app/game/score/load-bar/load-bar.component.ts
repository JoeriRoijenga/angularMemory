import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-load-bar',
  templateUrl: './load-bar.component.html',
  styleUrls: ['./load-bar.component.scss']
})
export class LoadBarComponent implements OnInit {
  private intervalID: number;
  public width: number = 100;

  constructor(private appService: GameService) { }

  ngOnInit(): void {
    this.appService.loadBarNew.subscribe((state) => {
      switch (state) {
        case true:
          this.startInterval();
          break;
        case false:
          this.resetInterval();
          break;
      }
    })
  }

  public startInterval() {
    this.intervalID = setInterval(() => {
      this.width -= 1;
    }, 62.5);
  }

  public resetInterval() {
    clearInterval(this.intervalID);
    this.width = 100;
  }
}
