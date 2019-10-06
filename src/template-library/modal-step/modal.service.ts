import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ConfirmModalOptions } from './confirm-modal/confirm-modal-options.interface';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable()
export class ModalService {
    constructor(public dialog: MatDialog) {}

    public confirm(options: ConfirmModalOptions): MatDialogRef<ConfirmModalComponent> {
        return this.dialog.open(ConfirmModalComponent, {
            width: options.width || '400px',
            data: options,
        });
    }

    public openCustomModal(options: ConfirmModalOptions, component: any): MatDialogRef<any> {
        return this.dialog.open(component,{
            width: options.width || '600px',
            data: options.data,
            id: options.id
        });
    }
}
