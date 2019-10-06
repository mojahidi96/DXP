import { Component } from '@angular/core';
import { NodeComponentAbstract } from '@lumen/client-angular';

@Component({
  styles: [':host {display: block}'],
  template: `
<strong>There is no suitable node component registered for {{ node?.fullName }}</strong>
<dl>
    <dt>type</dt>
    <dd>{{ node?.type }}</dd>
    <dt>uiHint</dt>
    <dd>{{ node?.uiHint }}</dd>
    <dt>format</dt>
    <dd>{{ node?.format }}</dd>
    <dt>contentType</dt>
    <dd>{{ node?.contentType }}</dd>
</dl>`,
})
export class UnknownNodeComponent extends NodeComponentAbstract {
}
