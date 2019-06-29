import {ToasterConfig} from 'angular2-toaster';

/**
 * Configuaration for toaster object
 */
export const toasterConfig = new ToasterConfig({
  positionClass: 'toast-bottom-right',
  showCloseButton: true,
  newestOnTop: false,
  limit: 5
});
