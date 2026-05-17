import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  showModal  = signal(false);
  isEditing  = signal(false);
  modalType  = signal<'user' | 'product' | null>(null);
  modalData  = signal<any>(null);

  open(type: 'user' | 'product', data: any = null, editing = false) {
    this.modalType.set(type);
    this.modalData.set(data);
    this.isEditing.set(editing);
    this.showModal.set(true);
  }

  close() {
    this.showModal.set(false);
    this.modalType.set(null);
    this.modalData.set(null);
    this.isEditing.set(false);
  }
  closeOnBackdrop(event: MouseEvent): void {

  if ((event.target as HTMLElement).classList.contains('overlay')) {
    this.close();
  }

}
}