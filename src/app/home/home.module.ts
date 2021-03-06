import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { OwnerBoardComponent } from './owner-board/owner-board.component';
import { AddBoardComponent } from './add-board/add-board.component';


@NgModule({
  declarations: [
    HomeComponent,
    OwnerBoardComponent,
    AddBoardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports : [
    OwnerBoardComponent
  ]
})
export class HomeModule { }
