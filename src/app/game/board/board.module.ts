import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
    declarations: [BoardComponent, TileComponent],
    exports: [
        BoardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BoardModule { }
