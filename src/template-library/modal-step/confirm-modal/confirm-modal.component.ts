import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ConfirmModalOptions} from './confirm-modal-options.interface';


@Component({
    styleUrls: ['./confirm-modal.component.scss'],
    templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmModalOptions,
    ) { }

    public close(result: boolean): void {
        this.dialogRef.close(result);
    }

    public closeWithResult(result: boolean, data: ConfirmModalComponent | undefined): void{
        let info = {result: result, data: data};
        this.dialogRef.close(info);
    }
}
