import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const components = [LayoutComponent, NotFoundComponent, ConfirmationDialogComponent];
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
    MatDialogModule,
    RouterModule
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
