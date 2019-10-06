import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component({
    styleUrls: ['./image-capture-node.component.scss'],
    templateUrl: './image-capture-node.component.html',
})
export class ImageCaptureNodeComponent extends NodeComponentAbstract {
    public error = false;

    // @todo This should be configurable. (There is no mechanism to achieve this at present.)
    private options: CameraOptions = {
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        quality: 80,
        sourceType: this.camera.PictureSourceType.CAMERA,
        targetHeight: 1000,
        targetWidth: 1000,
    };

    constructor(private camera: Camera) {
        super();
    }

    public captureImage(): void {
        this.camera.getPicture(this.options).then((image: string) => {
            this.node.setValue(`data:image/jpeg;base64,${image}`);
        }, () => {
            this.error = true;
        });
    }
}
