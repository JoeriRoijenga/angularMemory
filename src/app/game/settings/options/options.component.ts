import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Output() sizeOutput = new EventEmitter<number>();
  @Output() characterOutput = new EventEmitter<string>();

  characters = ["*", "#", "@", "&", "%", "X"];
  sizes = ["2", "4", "6"];
  standardSize: string = "6";
  standardChar: string = "*";

  constructor() { }

  ngOnInit(): void {
    this.onSizeChange(this.standardSize);
    this.onCharacterChange(this.standardChar);
  }

  onSizeChange(size: string) {
    this.sizeOutput.emit(parseInt(size));
  }

  onCharacterChange(character: string) {
    this.characterOutput.emit(character);
  }
}
