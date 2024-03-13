import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RockAddComponent } from './rock-add/rock-add.component';
import { RockDetailsComponent } from './rock-details/rock-details.component';



@NgModule({
  declarations: [
    RockAddComponent,
    RockDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RockModule { }
