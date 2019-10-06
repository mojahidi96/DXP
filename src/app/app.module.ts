import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LumenModule, LUMEN_CLIENT_CONFIG, LUMEN_NODE_COMPONENTS, LUMEN_STEP_TEMPLATES } from '@lumen/client-angular';

import {TemplateLibraryModule} from '../template-library/template-library.module';
import {JourneyComponent} from "./journey-comp/journey.component";
import {MatSnackBarModule, MatDividerModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {appInjector} from "../template-library/services/app.util";
import {SalesHeaderComponent} from "./app-template/header/header.component";
import {SalesFooterComponent} from "./app-template/footer/footer.component";
import {SalesSidebarComponent} from "./app-template/sidebar/sidebar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UICarouselModule} from "ui-carousel";
import {environment} from "../environments/environment";
import {ServiceTypeComponent} from "./service-type/service-type.component";
import {SelectTileComponent} from "./select-tile/select.tile.component";
import {ProgressBarComponent} from "./progress-bar/progress.bar.component";
import {PromoComponent} from "./promotions/promo.component";
import {SelectCustomComponent} from "./select-custom/select.custom.component";
import {ProductListComponent} from "./product-list/product.list.component";
import {ProductDetailsComponent} from "./product-details/product.details.component";
import {ProductService} from "./product-details/product.service";
import {ModalService} from "../template-library/modal-step/modal.service";
import {SummaryComponent} from "./summary-component/summary.component";
import {GridTileComponent} from './grid-tiles/grid-tiles-component';
import {BreadCrumbComponent} from './breadcrumb/breadcrumb.component';
import {SectionalTemplateComponent} from './sectional-template/sectional-template.component';
import {CarouselComponent} from './app-carousel/app-carousel.component';
import {DeviceDetailsComponent} from './device-details/device-details.component';
import {TradeInConfirmComponent} from './trade-in-confirm/trade-in-confirm.component';
import {ColorGridComponent} from './color-grid/color-grid.component';
import {DeviceDataInputComponent} from "./device-data-input/device-data-input-component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BillingDetailsComponent } from './billing-details/billing.details.component';
import { RateplanModalComponent } from './rate-plan-modal/rateplan-modal.component';
import { DeviceSelectionComponent } from './device-selection/device-selection.component';
import {ThemeModule} from "./app-theme/theme-module";
import {sncrTheme} from "./app-theme/sncr-theme";
import {ThemeService} from "./app-theme/theme-service";
import {salesTheme} from "./app-theme/sales-theme";
import {NgSelectModule} from "@ng-select/ng-select";
import {PartnerXTheme} from "./app-theme/PartnerX-theme";
import {FrontierTheme} from "./app-theme/Frontier-theme";
import { PhoneNumberFormatPipe } from 'src/template-library/pipes/phone-number.pipe';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { RetailListComponent } from './retail-list/retail-list.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LumenModule,
    FormsModule,
    TemplateLibraryModule,
    MatSnackBarModule,
    MatDividerModule,
    UICarouselModule,
    MatFormFieldModule,
    MatInputModule,
    ThemeModule.forRoot({
      themes: [sncrTheme, salesTheme, PartnerXTheme, FrontierTheme],
      active: 'SALES'
    }),
    NgSelectModule,
  ],
  declarations: [
    AppComponent,
    JourneyComponent,
    SalesHeaderComponent,
    SalesFooterComponent,
    SalesSidebarComponent,
    DashboardComponent,
    ServiceTypeComponent,
    SelectTileComponent,
    ProgressBarComponent,
    PromoComponent,
    SelectCustomComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SummaryComponent,
    SectionalTemplateComponent,
    GridTileComponent,
    BreadCrumbComponent,
    CarouselComponent,
    SummaryComponent,
    DeviceDetailsComponent,
    TradeInConfirmComponent,
    ColorGridComponent,
    ShoppingCartComponent,
    DeviceDataInputComponent,
    BillingDetailsComponent,
    RateplanModalComponent,
    DeviceSelectionComponent,
    PhoneNumberFormatPipe,
    CatalogListComponent,
    RetailListComponent
  ],
  providers: [
    {
      provide: LUMEN_CLIENT_CONFIG,
      multi: false,
      useValue: {
        api: environment.apiUrl ,
        locale: 'en-GB'
      }
    },
    {
      provide: LUMEN_NODE_COMPONENTS,
      multi: true,
      useValue: [
        {
          component: GridTileComponent,
          uiHint: 'GridTileComponent',
          type: 'string'
        },
        {
          component: BreadCrumbComponent,
          uiHint: 'BreadCrumbComponent',
          type: 'string'
        },
        {
          component: CarouselComponent,
          uiHint: 'CarouselComponent',
          type: 'string'
        },
        {
          component: DeviceDetailsComponent,
          uiHint: 'DeviceDetailsComponent',
          type: 'string',
        },
        {
          component: PromoComponent,
          uiHint: 'PromoComponent',
          type: 'string',
        },
        {
          component: ColorGridComponent,
          uiHint: 'ColorGrid',
          type: 'string',
        },
      {
        component: BillingDetailsComponent,
        uiHint: 'BillingDetailsComponent',
        type: 'string',
    },

      ]
    },
    {
      provide: LUMEN_STEP_TEMPLATES,
      multi: true,
      useValue: {
        serviceType: ServiceTypeComponent,
        selectTile: SelectTileComponent,
        selectCustom: SelectCustomComponent,
        productList: ProductListComponent,
        summary: SummaryComponent,
        sectionalTemplate: SectionalTemplateComponent,
        tradeinConfirm: TradeInConfirmComponent,
        shoppingCart: ShoppingCartComponent,
        deviceDataInput: DeviceDataInputComponent,
        deviceSelection:DeviceSelectionComponent,
        CatalogList:CatalogListComponent,
        retailList:RetailListComponent,
      }
    },
    ProductService,
    ModalService,
    ThemeService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [

    ServiceTypeComponent,
    SelectTileComponent,
    ProgressBarComponent,
    PromoComponent,
    SelectCustomComponent,
    ProductListComponent,
    SummaryComponent,
    SectionalTemplateComponent,
    GridTileComponent,
    BreadCrumbComponent,
    CarouselComponent,
    SummaryComponent,
    DeviceDetailsComponent,
    TradeInConfirmComponent,
    ShoppingCartComponent,
    ColorGridComponent,
    DeviceDataInputComponent,
    BillingDetailsComponent,
    RateplanModalComponent,
    DeviceSelectionComponent,
    CatalogListComponent,
    RetailListComponent
    ]
})

export class AppModule {
  constructor(public injector: Injector) {
    appInjector(injector);
  }
}
