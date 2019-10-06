import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MatSnackBar } from "@angular/material";

import { BaseComponent } from "../base.component";
import {TemplateService} from "../../template-library/services/com.service";
import {ClientConfig, LUMEN_CLIENT_CONFIG} from "@lumen/client-angular";

@Component(
    {
        selector: "journey-comp",
        templateUrl: "./journey-control.html"
    }
)

export class JourneyComponent extends BaseComponent implements OnInit {

    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        @Inject(LUMEN_CLIENT_CONFIG) public config: ClientConfig,
        private route: ActivatedRoute,
        private templateService: TemplateService
    ) {
        super(config);

        this.templateService.featureSource$.subscribe(info => {
            if (info.instantiateFlow) {
              this.stepTemplateOutlet.instantiatePilot = info.instantiateFlow;
            }
            if (info.feature) {
              this.stepTemplateOutlet.feature = info.feature;
            }
            this.stepTemplateOutlet.refId = sessionStorage.getItem("cws-ref").replace(/['"]+/g, '');
            this.stepTemplateOutlet.restart();
        });
    }

    ngOnInit(): void {
        let data = this.route.snapshot.params.id;
        // this.config.headers = {
        //     channel: 'TABLET'
        // }
    }
}
