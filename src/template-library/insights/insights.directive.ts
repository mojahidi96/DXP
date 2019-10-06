import { Directive, Input, ElementRef, OnInit, OnDestroy, HostListener, Inject, Host } from "@angular/core";
import { InsightsService } from "./Insights.service";
import * as jsonPath from 'jsonpath/jsonpath';
import { Node, ObjectNode } from '@lumen/core-js';

@Directive({
    selector: "[insights]"
})
export class InsightsDirective implements OnInit, OnDestroy {
    // Passing the rootNode for filter values and passing to logevent service
    @Input('rootNode') rootNode;
    // Directive is either for a button or template.
    @Input('insights') isButton;
    // Incase the value has not been passed using beekeeper the value can be manually be passed using dataEvent
    // for now only supports string value
    @Input('DataEvent') DataEvent;

    EntryEvents;
    DataCaptureEvent: ObjectNode;
    ExitEvents;
    constructor(private el: ElementRef, private insightService: InsightsService) { }

    ngOnInit() {
        if (this.isButton !== true && this.rootNode) {
            this.EntryEvents = this.rootNode.findNode("insights.keys_entered")
            if (this.EntryEvents) {
                this.insightService.logEvents(this.EntryEvents);
            }
        }
    }

    ngOnDestroy() {
        if (this.isButton != true && this.rootNode) {
            this.ExitEvents = this.rootNode.findNode("insights.keys_exited")
            if (this.ExitEvents) {
                this.insightService.logEvents(this.ExitEvents);
            }
        }
        if (this.isButton) {
            this.logEvent();
        }
    }

    logEvent() {
        // for now the Insights keys are Static later will config this in the environment
        this.DataCaptureEvent = this.rootNode.findNode("insights.data_keys");
        if (this.DataCaptureEvent && this.DataCaptureEvent.isObject) {
            this.DataCaptureEvent.forEachNode((node1: Node) => {
                let selectedEvent = this.rootNode.findNode(node1.initialValue);
                if (!selectedEvent && node1.initialValue !== undefined) {
                    let response = jsonPath.query(this.rootNode, node1.initialValue);
                    if (response.length > 1) {
                        selectedEvent = response
                    } else {
                        if (response[0] instanceof Object) {
                            selectedEvent = response;
                        } else {
                            this.DataEvent = response;
                            this.DataEvent = this.DataEvent.join(',')
                        }
                    }
                }
                selectedEvent ? this.checkType(selectedEvent, node1) : this.insightService.logEvent(node1.name, this.DataEvent);
            })
        }
    }

    checkType(selectedEvent, node1) {
        if (selectedEvent.isObject) {
            this.sendEvent(selectedEvent, 'Object', node1)
        } else if (selectedEvent.type == 'boolean') {
            this.sendEvent(selectedEvent, 'boolean', node1)
        } else if (selectedEvent.type == 'string') {
            this.sendEvent(selectedEvent, 'boolean', node1)
        } else if (selectedEvent.type === undefined) {
            this.sendEvent(selectedEvent, 'array', node1)
        }
    }

    sendEvent(selectedEvent, type, node1?) {
        let value = [];
        switch (type) {
            case 'Object':
                selectedEvent.forEachNode((subNode, i) => {
                    if (subNode.type === 'boolean') {
                        if (subNode.value === true)
                            value.push(subNode.name);
                    } else {
                        value.push(subNode.value);
                    }
                });
                this.insightService.logEvent(node1.name, value.join(','));
                break;
            case 'boolean':
                if (selectedEvent.type === 'boolean' && selectedEvent.value === true) {
                    value.push(selectedEvent.name);
                } else {
                    value.push(selectedEvent.value);
                }
                this.insightService.logEvent(node1.name, value.join(','));
                break;
            case 'array':
                let supportData = this.rootNode.findNode("insights.SupportData");
                if (supportData) {
                    supportData.forEachNode(supportItem => {
                        if (supportItem.name === node1.name) {
                            let value = [];
                            if (typeof (selectedEvent[0]) == 'string') {
                                selectedEvent.forEach(element => {
                                    if (element.includes(supportItem.initialValue)) {
                                        value.push(element);
                                    }
                                });
                            } else {
                                selectedEvent.forEach(element => {
                                    let name = supportItem.name;
                                    let value_toCheck = element.children.itemCategoryid.value.replace(/\s/g, '_');
                                    if (value_toCheck === name) {
                                        value.push(element.children.itemName.value)
                                    }
                                })
                            }
                            if (value.length > 0) {
                                this.insightService.logEvent(node1.name, value);
                            }
                        }
                    })
                }
                break;
            default:
                break;
        }
    }
}
