import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  size: number;
  character: string;

  constructor(private appService: AppService) { }

  ngOnInit() { }

  changeSettings() {
    this.appService.changeSize(this.size);
    this.appService.changeChar(this.character);
    this.appService.timerEvent(0);
  }

  saveSize(event) {
    this.size = event;
  }

  saveCharacter(event) {
    this.character = event;
  }
}
