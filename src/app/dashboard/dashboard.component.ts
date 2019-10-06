import {Component, Inject, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";

import {MatSnackBar} from "@angular/material";
import {BaseComponent} from "../base.component";
import {ClientConfig, LUMEN_CLIENT_CONFIG} from "@lumen/client-angular";


@Component(
    {
        selector: "dashboard",
        templateUrl: "./dashboard.html",
        styleUrls: ["./dashboard.scss"]
    }
)
export class DashboardComponent extends BaseComponent implements OnDestroy{

    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        @Inject(LUMEN_CLIENT_CONFIG) public config: ClientConfig
    ){
        super(config);
    }

    public routeToFeature(channel: string): void {
        this.router.navigate(['/journey', channel]);
    }

    ngOnDestroy(): void {}
}
