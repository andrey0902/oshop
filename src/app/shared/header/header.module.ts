import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
