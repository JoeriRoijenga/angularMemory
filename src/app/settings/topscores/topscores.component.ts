import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-topscores',
  templateUrl: './topscores.component.html',
  styleUrls: ['./topscores.component.scss']
})
export class TopscoresComponent implements OnInit {
  public topScores = [
    {
      name:"Barack Obama", time:200
    },
    {
      name:"Bernie Sanders", time:300
    },
    {
      name:"Hillary Clinton", time:400
    },
    {
      name:"Jeb Bush", time:500
    },
    {
      name:"Donald Trump", time:600
    }
  ];

  public avgTime: number;
  public avgDiff: number;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    let total:number = 0;
    this.topScores.forEach((player) => total += player.time)
    this.avgTime = Math.round(total / this.topScores.length);
    this.avgDiff = 0;

    this.appService.scoreNew.subscribe(score => {
      if (score != 0) {
        this.topScores.push({name: "test", time: score})
        this.avgTime = Math.round(total / this.topScores.length);
      }
    });

    this.appService.currentTime.subscribe(time => {
      if (time > this.avgTime) {
        this.avgDiff = time - this.avgTime;
      }
    })
  }

}
