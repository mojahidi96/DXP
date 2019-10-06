import { Component, OnInit } from '@angular/core';

import {SearchService} from "../services/search.service";
import {RestartService} from "../services/com.service";
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component({
  selector: 'resume-node',
  templateUrl: './resume-node.component.html',
  styleUrls: ['./resume-node.component.scss']
})
export class ResumeNodeComponent extends NodeComponentAbstract implements OnInit {
  public type = 'text';
  private timer: number;
  public cwsRef: string;

  constructor(public search: SearchService, public restartService: RestartService) {
    super();
  }

  ngOnInit() {
  }

  resume(event: any) {
      console.log(this.cwsRef);
      this.restartService.restart(this.cwsRef);
  }

  onKey(event: any) {
      function checkNotDone(state) {
          return state.businessContext.flowTraversalMap.default.createdResources.indexOf('Payment.PayBill') < 0;
      }

      if(this.node.value){
          if (this.timer) {
              clearTimeout(this.timer)
          }

          this.timer = setTimeout(
              (() => {
                  this.cwsRef = null;
                  this.search
                      .search(this.node.value, checkNotDone, 1)
                      .subscribe((state: any) => {
                          this.cwsRef = state['cws-ref'];
                      })
              }).bind(this),
              300
          );
      }
  }
}
