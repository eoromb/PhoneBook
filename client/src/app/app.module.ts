import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { toasterConfig } from './toaster.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: 'TOASTER_CONFIG', useValue: toasterConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
