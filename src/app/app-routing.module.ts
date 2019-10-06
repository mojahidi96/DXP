import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JourneyComponent} from "./journey-comp/journey.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full"
  },
  {
    path: "app",
    component: DashboardComponent,
    data: {headerDisp: false, sidebar: false}
  },
  {
    path: "journey/:id",
    data: {headerDisp: true, sidebar: true},
    component: JourneyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
