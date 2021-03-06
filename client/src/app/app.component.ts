import { Component, Inject } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Phone Book';
  constructor(@Inject('TOASTER_CONFIG') public toasterConfig: ToasterConfig) {
  }
}
