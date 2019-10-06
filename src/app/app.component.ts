import {Component, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public routeData: any;
  public sidebar: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((val) => {
      if (val && val instanceof NavigationEnd) {
        this.routeData = this.route.snapshot.firstChild.data;
        if (val.urlAfterRedirects.indexOf('app') > -1) {
          this.renderer.addClass(document.body, 'app-body');
        } else {
          this.renderer.removeClass(document.body, 'app-body');
        }
      }
    });
  }

}
