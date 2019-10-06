import { Component } from '@angular/core';

@Component({
  selector: 'sales-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SalesSidebarComponent {
	panelOpenState = false;
}
