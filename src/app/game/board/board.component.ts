import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  protected alphabet: string = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ";
  public letters: string[][];
  protected size: number;
  public char: string;
  private tileOne: TileComponent;
  private tileTwo: TileComponent;
  private currentFound: number;
  private firstTime: boolean;

  constructor(private appService: GameService) { }

  public height: number;

  ngOnInit(): void {
    this.appService.currentSize.subscribe(size => {
      this.size = size;
      this.setupGame();
    });
    this.appService.currentChar.subscribe(char => this.char = char)
  }

  private setupGame(): void {
    this.firstTime = true;
    this.currentFound = 0;
    this.letters = [];
    this.height = 100 / this.size;

    this.createLettersArray(this.shuffle(this.alphabet.substring(0, this.size * this.size).split('')));
  }

  createLettersArray(letterArray: string[]):void {
    for (let i = 0; i < this.size; i++) {
      this.letters[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.letters[i][j] = letterArray[j + (i * this.size)]
      }
    }
  }

  private shuffle(array: string[]):string[] {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  public saveTile(tile: TileComponent): void {
    if (this.firstTime) {
      this.appService.timerEvent(1);
      this.firstTime = false;
    }

    if (this.tileOne != null && this.tileTwo != null) {
      this.resetTiles();
    }

    if (this.tileOne == null) {
      this.tileOne = tile;
      this.appService.loadbarStateChange(true);
    } else if (this.tileTwo == null) {
      this.tileTwo = tile;
    }

    if (this.tileOne != null && this.tileTwo != null) {
      if (this.tileOne.letter == this.tileTwo.letter) {
        this.currentFound++;
        this.foundTiles();
        this.appService.changeFound(this.currentFound);
      }
    }
  }

  public resetTiles(): void {
    if (this.tileOne != null) {
      this.tileOne.resetTile();
      this.tileOne = null;
    }
    if (this.tileTwo != null) {
      this.tileTwo.resetTile();
      this.tileTwo = null;
    }
    this.appService.loadbarStateChange(false);
  }

  private foundTiles(): void {
    this.tileOne.tileFound();
    this.tileOne = null;
    this.tileTwo.tileFound();
    this.tileTwo = null;

    if (this.currentFound == this.size) {
      this.appService.timerEvent(2);
    }
    this.appService.loadbarStateChange(false);
  }
}

