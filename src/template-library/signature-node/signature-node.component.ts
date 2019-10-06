import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import SignaturePad from 'signature_pad';
import {NodeComponentAbstract} from '@lumen/client-angular';

@Component({
    styleUrls: ['./signature-node.component.scss'],
    templateUrl: './signature-node.component.html',
})
export class SignatureNodeComponent extends NodeComponentAbstract implements OnInit {
    @ViewChild('sigCanvas') private canvas: ElementRef;

    private signaturePad: SignaturePad;

    public ngOnInit(): void {
        if (!this.node.readOnly && this.canvas) {
            // the below fixes alignment issues when using responsive % width for canvas sizing
            this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
            this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
            this.signaturePad = new SignaturePad(this.canvas.nativeElement, {
                onEnd: this.saveValue.bind(this),
            });
            if (this.node.value) {
                this.signaturePad.fromDataURL(this.node.value);
            }
        }
    }

    public saveValue(): void {
        this.node.value = this.signaturePad.toDataURL();
    }

    public reset(): void {
        this.signaturePad.clear();
        this.node.value = null;
    }
}
