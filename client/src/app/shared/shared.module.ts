import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';

const components = [LayoutComponent, NotFoundComponent];
/**
 * Contains shared components
 */
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class SharedModule { }
