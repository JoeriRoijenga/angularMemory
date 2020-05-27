import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopscoresComponent } from './topscores/topscores.component';

import { SettingsComponent } from '../settings/settings.component';
import { OptionsComponent } from './options/options.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  declarations: [TopscoresComponent, SettingsComponent, OptionsComponent, ColorsComponent],
  exports: [
    SettingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SettingsModule { }
