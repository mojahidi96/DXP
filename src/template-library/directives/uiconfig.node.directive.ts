import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';

import {NodeComponentResolverService} from '@lumen/client-angular';
import {Node, PrimitiveNode} from '@lumen/core-js';


@Directive({
  // tslint:disable-next-line
  selector: 'uiconfig-node'
})
export class UiConfigNodeDirective implements OnInit {
  @Input() public node: Node | PrimitiveNode;
  @Input() public config: any;
  @Input() public data: any;
  @Input() public loadComponent: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private nodeComponentResolverService: NodeComponentResolverService,
              private viewContainerRef: ViewContainerRef) {
  }

  public ngOnInit(): void {
    let loadComp = null;
    if (this.loadComponent) {
      loadComp = this.loadComponent;
    } else {
      loadComp = this.config.componentName;
    }

    if (loadComp) {
      const component = this.nodeComponentResolverService.findNodeComponent('string', loadComp);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory<any>(component);

      this.viewContainerRef.clear();

      const componentRef = this.viewContainerRef.createComponent(componentFactory);

      componentRef.instance.rootNode = this.node;
      componentRef.instance.config = this.config;
      componentRef.instance.data = this.data;
    }
  }
}
