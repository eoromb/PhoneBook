import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Gets access to configuration parameters
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiBaseUrl = `${environment.apiUrl}`;
  constructor() {
  }
  public getContactsUrl() {
    return `${this.apiBaseUrl}/contacts`;
  }
}
