import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Injectable } from '@angular/core';

/**
 * Shows notification popup
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toasterService: ToasterService) {}

  showError(title: string, message: string, icon?: string) {
    this.showNotification('error', title, message, icon);
  }
  showErrors(title: string, errors: string[], icon?: string) {
    this.showNotifications('error', title, errors, icon);
  }

  private showNotification(
    type: string,
    title: string,
    message: string,
    icon?: string,
    bodyOutputType?: BodyOutputType
  ): void {
    const toast: Toast = {
      type,
      title,
      body: message,
      bodyOutputType: bodyOutputType != null ? bodyOutputType : BodyOutputType.Default,
      timeout: type === 'error' ? 10000 : 5000
    };
    this.toasterService.pop(toast);
  }
  private showNotifications(
    type: string,
    title: string,
    messages: string[],
    icon?: string
  ): void {
    let elements = '';
    messages.forEach(m => (elements += `<li>${m}</li>`));
    const body = `<ul>${elements}</ul>`;
    this.showNotification(type, title, body, icon, BodyOutputType.TrustedHtml);
  }
}
