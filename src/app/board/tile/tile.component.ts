import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardComponent } from '../board.component';

enum CardState {
  active,
  inactive,
  found
}

@Component({
  selector: 'td[app-tile]',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() letter: string;
  @Input() char: string;
  @Output("saveTile") saveTile: EventEmitter<TileComponent> = new EventEmitter();
  @Output("resetTiles") resetTiles: EventEmitter<TileComponent> = new EventEmitter();

  public cardState: CardState;
  public showChar: string;
  protected timeOutID: number;

  constructor() {
    this.cardState = CardState.inactive;
  }

  ngOnInit(): void {
    this.showChar = this.char;
  }

  public changeState(): void {
    if (this.cardState == CardState.inactive) {
      this.cardState = CardState.active;
      this.showChar = this.letter;

      this.timeOutID = setTimeout(() => {
        this.deactivateTile();
        this.resetTiles.emit();
      }, 5000);

      this.saveTile.emit(this);
    }
  }

  public resetTile(): void {
    this.deactivateTile();
  }

  private deactivateTile(): void {
    this.showChar = this.char;
    this.cardState = CardState.inactive;
    clearTimeout(this.timeOutID);
  }

  public tileFound(): void {
    this.cardState = CardState.found;
    clearTimeout(this.timeOutID);
  }
}
