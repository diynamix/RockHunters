import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RockListComponent } from './rock-list/rock-list.component';
import { RockAddComponent } from './rock-add/rock-add.component';
import { RockDetailsComponent } from './rock-details/rock-details.component';
import { RockRoutingModule } from './rock-routing-module';

@NgModule({
  declarations: [
    RockListComponent,
    RockAddComponent,
    RockDetailsComponent
  ],
  imports: [
    CommonModule,
    RockRoutingModule
  ]
})
export class RockModule { }
