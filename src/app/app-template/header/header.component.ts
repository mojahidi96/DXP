import {Component, EventEmitter, Output, OnInit, Input, Inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {FeatureInfo, TemplateService} from "../../../template-library/services/com.service";
import {ClientConfig, LUMEN_CLIENT_CONFIG} from "@lumen/client-angular";
import { environment } from "src/environments/environment";
import {ThemeService} from "../../app-theme/theme-service";

@Component({
  selector: "header-comp",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"]
})

export class SalesHeaderComponent implements OnInit {

  @Output() logout: EventEmitter<number> = new EventEmitter<number>();
  public currentSelection = 'DXP Journeys';
  public quantity = 0;
  @Input() routeData: any;
  public menuSlider = false;
  public isInsights = false;
  public defaultAppEngine: string;
  public insightUI: any;
  public appEngineList = [
   /* //Dev Env
    {id :"1001", appUrl: "https://app-engine-1001-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1002", appUrl: "https://app-engine-1002-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1003", appUrl: "https://app-engine-1003-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1004", appUrl: "https://app-engine-1004-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1005", appUrl: "https://app-engine-1005-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1006", appUrl: "https://app-engine-1006-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1007", appUrl: "https://app-engine-1007-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1008", appUrl: "https://app-engine-1008-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1009", appUrl: "https://app-engine-1009-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1010", appUrl: "https://app-engine-1010-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1011", appUrl: "https://app-engine-1011-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1012", appUrl: "https://app-engine-1012-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1013", appUrl: "https://app-engine-1013-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1014", appUrl: "https://app-engine-1014-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1015", appUrl: "https://app-engine-1015-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1016", appUrl: "https://app-engine-1016-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1017", appUrl: "https://app-engine-1017-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1018", appUrl: "https://app-engine-1018-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1019", appUrl: "https://app-engine-1019-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1020", appUrl: "https://app-engine-1020-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1021", appUrl: "https://app-engine-1021-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1022", appUrl: "https://app-engine-1022-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1023", appUrl: "https://app-engine-1023-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1024", appUrl: "https://app-engine-1024-dev.dxpdesign.dev.cloud.synchronoss.net/api"},
    {id :"1025", appUrl: "https://app-engine-1025-dev.dxpdesign.dev.cloud.synchronoss.net/api"}, */

    /*
     //Training Env
     {id :"1001", appUrl: "https://app-engine-1001-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1002", appUrl: "https://app-engine-1002-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1003", appUrl: "https://app-engine-1003-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1004", appUrl: "https://app-engine-1004-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1005", appUrl: "https://app-engine-1005-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1006", appUrl: "https://app-engine-1006-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1007", appUrl: "https://app-engine-1007-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1008", appUrl: "https://app-engine-1008-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1009", appUrl: "https://app-engine-1009-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1010", appUrl: "https://app-engine-1010-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1011", appUrl: "https://app-engine-1011-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1012", appUrl: "https://app-engine-1012-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1013", appUrl: "https://app-engine-1013-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1014", appUrl: "https://app-engine-1014-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1015", appUrl: "https://app-engine-1015-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1016", appUrl: "https://app-engine-1016-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1017", appUrl: "https://app-engine-1017-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1018", appUrl: "https://app-engine-1018-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1019", appUrl: "https://app-engine-1019-training.dxpdevops.dev.cloud.synchronoss.net/api"},
     */

    /*
     //Verizon Environment
     {id :"1001", appUrl: "https://app-engine-1001-verizon.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1002", appUrl: "https://app-engine-1002-verizon.dxpdevops.dev.cloud.synchronoss.net/api"},
     {id :"1003", appUrl: "https://app-engine-1003-verizon.dxpdevops.dev.cloud.synchronoss.net/api"},
     */


     // Sales Environment
     {id : "1001", appUrl: "https://app-engine-1001-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1002", appUrl: "https://app-engine-1002-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1003", appUrl: "https://app-engine-1003-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1004", appUrl: "https://app-engine-1004-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1005", appUrl: "https://app-engine-1005-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1006", appUrl: "https://app-engine-1006-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1007", appUrl: "https://app-engine-1007-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1008", appUrl: "https://app-engine-1008-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1009", appUrl: "https://app-engine-1009-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1010", appUrl: "https://app-engine-1010-sales.dxpdesign.dev.cloud.synchronoss.net/api"},
     {id : "1019", appUrl: "https://app-engine-1019-dev.dxpdesign.dev.cloud.synchronoss.net/api"}

    ];

  public selectedTheme;
  public themes = [
    {id: "1", colors: "Sales"},
    {id: "2", colors: "Synchronoss" },
    {id: "3", colors: "PartnerX"},
    {id: "4", colors: "Partner Red"}
  ];

  constructor(public tempService: TemplateService,
              public router: Router,
              private themeService: ThemeService,
              @Inject(LUMEN_CLIENT_CONFIG) public config: ClientConfig
              ) {

    this.tempService.tempSource$.subscribe(
      info => {
        if (info && info.type && info.type === 'cart') {
          this.setItemsQuantity(info.data);
        } else if (info && info.type && info.type === 'insights' && info.display) {
          this.isInsights = true;
        }
      }
    );

  }

  ngOnInit(): void {
    console.log(this.quantity);
    this.insightUI = environment.insightsUIURL;
    const appEngineId = sessionStorage.getItem('appEngineId');
    const appEngineUrl = sessionStorage.getItem('appEngineUrl');
    if (appEngineId && appEngineUrl && appEngineId !== 'undefined') {
      this.defaultAppEngine = appEngineId;
      this.setAppEngine({ appUrl: appEngineUrl, id: appEngineId });
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routelist = event.url.split('/');
        (routelist.length > 2) ?
          this.currentSelection = `${this.getHeadings(routelist[routelist.length - 1])} Journey` : this.currentSelection = 'DXP Journeys';
      }
    });
  }

  public setAppEngine(item: any) {
    if (item) {
      this.config.api = item.appUrl;
      this.defaultAppEngine = item.id;
      sessionStorage.setItem('appEngineId', item.id);
      sessionStorage.setItem('appEngineUrl', item.appUrl);
    }
  }

  public setTheme(item1: any) {
    const active = this.themeService.getActiveTheme();
    if (item1 ) {
      if (item1.id === "1"  ) {
        this.themeService.setTheme('SALES');
      } else if (item1.id === "2"  ) {
        this.themeService.setTheme('SNCR');
      } else if (item1.id === "3"  ) {
        this.themeService.setTheme('PartnerX');
      } else if (item1.id === "4"  ) {
        this.themeService.setTheme('Frontier');
      }
    }
  }

  getHeadings(route) {
    return route === 'market' ? 'Retail' : route === 'tradein' ? 'trade-in' : route;
  }

  public routeToFeature(channel: string): void {
    this.router.navigate(['/journey', channel]);
  }

  public logoutClick() {
    this.isInsights = false;
    this.setItemsQuantity(0);
    this.router.navigate(['/app']);
    // window.location.reload();
    // this.logout.emit();
  }


  public shoppingCart() {
    const data: FeatureInfo = {};
    data.instantiateFlow = "featurelinear";
    data.feature = 'Shopping';
    this.tempService.changeFeature(data);
    // this.shopping.emit();
    // this.router.navigate(['/shopping'])
  }

  private setItemsQuantity(id: any) {
    this.quantity = id;
  }

  public restart() {
    this.router.navigate(['/app']);
  }
}
