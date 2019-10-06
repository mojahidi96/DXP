
import { filter } from 'rxjs/internal/operators';

import {CommonPilot, DoneEvent, FeatureResourceEvent, LumenEvent, ResourceEvent, RootResourceEvent} from "@lumen/client-angular";
import {Link, LinkRel, Resource, ResponseData} from "@lumen/core-js";

export class FeatureLinerFlow extends CommonPilot {
    private lastFeature: Link | undefined;

    constructor(rootResource: Resource, headers: HeadersInit, private feature: string, defaultValues?: ResponseData) {
        super(rootResource, headers);

        this.events.pipe(
            filter<RootResourceEvent>((event: LumenEvent) => event instanceof RootResourceEvent),
        ).subscribe(async (event) => {
            try {
                let rel: LinkRel = 'service';
                if (!this.feature) {
                    rel = 'next';
                }

                const [nextLink]: Link[] = await event.resource.fetchLinks(rel, this.feature, this.headers as any);

                if (!nextLink) {
                    // No more next links, linear flow cannot continue and is considered complete..
                    return this.eventSubject.next(new DoneEvent());
                } else if (this.lastFeature && this.lastFeature.href === nextLink.href) {
                    return this.handleError(new Error('Infinite loop, no create or edit links available on the resource?'));
                }

              // Get the service link with matching href. This is done as the
              // service links have more complete link definitions.
              const serviceLink = (await event.resource.fetchLinks('service', undefined, this.headers as any))
                .find((link) => link.href === nextLink.href);

              if (!serviceLink) {
                return this.handleError(new Error('No service link for next link'));
              }

              this.featureStrategy = undefined;

              this.lastFeature = serviceLink;

              this.feature = undefined;

              return this.eventSubject.next(new FeatureResourceEvent(serviceLink.follow()));
            } catch (error) {
                return this.handleError(error);
            }
        });

        this.events.pipe(
            filter<ResourceEvent>((event: LumenEvent) => event instanceof ResourceEvent && !(event instanceof RootResourceEvent)),
        ).subscribe(async (event) => this.executeCreateOrEdit(event.resource));
    }
}
