import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
export interface ToastVar {
  message: string;
  type: 'SUCCESS' | 'ERROR';
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: HotToastService) {}
  showToast(toastVar: ToastVar) {
    if (toastVar.type == 'SUCCESS') {
      this.toast.success(toastVar.message, {
        dismissible: false,
        duration: 3000,
        position: 'top-center',
      });
    } else if (toastVar.type == 'ERROR') {
      this.toast.error(toastVar.message, {
        dismissible: false,
        duration: 3000,
        position: 'top-center',
      });
    }
  }
}
