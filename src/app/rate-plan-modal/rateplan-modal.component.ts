import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {RateplanModalOptionsInterface} from './rateplan-modal-options.interface';
import {SelectTileConfigInterface} from "../select-tile/select.tile.config.interface";
import {SelectTileComponent} from "../select-tile/select.tile.component";

@Component({
    templateUrl: './rateplan-modal.component.html',
})
export class RateplanModalComponent implements OnInit{
    @ViewChild(SelectTileComponent) public selectTile:SelectTileComponent
    conf:SelectTileConfigInterface;

    constructor(
        public dialogRef: MatDialogRef<RateplanModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: RateplanModalOptionsInterface,
    ) { }

    ngOnInit(): void {
        this.conf = {
            title: 'Select Plan',
            listHeader: '',
            responseQuery:'$.RatePlanResponse.availablePlans[?(@.carrierid =='+ this.dialogRef.id+')].ratePlan[*]',
            displayType: 'single',
            submitLabel : '',
            cancelLabel:'',
            tileSelect : 'Select',
            childNodeName: '',
            progressTitle: '',
            selectedNode : 'CommonFields.SelectedItems',
            currency : 'USD',
            cmsUrl : 'https://dev-dotcms.dxpus.demo.cloud.synchronoss.net/contentAsset/image/'
        }

    }

    public close(result: boolean): void {
        this.dialogRef.close(result);
    }

    public closeWithResult(): void{
        let info = null;
        if(this.selectTile && !(this.isEmptyObject(this.selectTile.packageSelected))){
            info = {data:this.selectTile.packageSelected};
        }
        this.dialogRef.close(info);
    }

    private isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
    }
}
