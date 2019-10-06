import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";

import { environment } from "src/environments/environment";
import { TemplateService } from "../services/com.service";
import { TranslatePipe } from '@lumen/client-angular';
import { Node } from '@lumen/core-js';
declare var DS: any;

@Injectable()
export class InsightsService{

    public ds:any;
    public userDetails: any = null;
    public userProfile: any = null;

    public eventData: Map<string, string> = new Map<string, string>();

    constructor(
        private httpClient: HttpClient,
        public tra: TranslatePipe,
        private tempService: TemplateService
    ){
        try{
            this.ds = new DS('dataswarm', {});
        }catch (e){
            console.log("Insight Not Active")
        }
    }

    public startInsights(userDetails:Node) {
        if(this.ds){
        console.log("Logging into Insights");
        console.log(userDetails);
        this.populateUserDetails(userDetails);
        console.log("CURRENT USER", this.userDetails);
        this.ds.resetSession(() => {
            if (this.userDetails) {
                this.httpClient.post(`${environment.insightsURL}createCookie`,
                    this.userDetails, { withCredentials: true }).subscribe(response => {
                        this.httpClient.get(`${environment.insightsURL}hasUser`,
                            { withCredentials: true }).subscribe(response => {
                                this.httpClient.get(`${environment.insightsURL}profile`,
                                    { withCredentials: true }).subscribe(response => {
                                        this.userProfile = response;
                                        if (this.userProfile[0].meta.depth0Name !== "Web User") {
                                            this.tempService.setInfo({ type: 'insights', display: true });
                                        }
                                    });
                            });
                    });
            }
        });
        }
    }

    public logEvent(key: string, value: any) {
        // code will be removed once we have solution for type of value to be set to an event.
        if(this.ds){
        if (key == 'tv_set_top_box_number') {
            value = value.toLocaleString().substr(0, 1);
        }
        // dont change any Id in whitelist since they are associated with metanames
        if (this.userDetails !== undefined && this.userDetails !== null) {
            this.ds.sendEvents(this.populatePayload(this.userDetails));
            this.ds.sendEvent(key, value);
        }
        }
    }

    private populatePayload(userDetails) {
        if (userDetails && !userDetails.user.meta.depth3Name && !userDetails.user.depth3) {
            return {
                "depth0Id": userDetails.user.depth0,
                "depth0Name": userDetails.user.meta.depth0Name,
                "depth4Name": userDetails.user.meta.depth4Name[0],
                "depth4Id": userDetails.user.depth4[0]
            }
        } else if (userDetails && !userDetails.user.meta.depth2Name && !userDetails.user.depth2) {
            return {
                "depth0Id": userDetails.user.depth0,
                "depth0Name": userDetails.user.meta.depth0Name,
                "depth3Name": userDetails.user.meta.depth3Name[0],
                "depth3Id": userDetails.user.depth3[0],
                "depth4Name": userDetails.user.meta.depth4Name[0],
                "depth4Id": userDetails.user.depth4[0]
            }
        } else if (userDetails && !userDetails.user.meta.depth1Name && !userDetails.user.depth1) {
            return {
                "depth0Id": userDetails.user.depth0,
                "depth0Name": userDetails.user.meta.depth0Name,
                "depth2Name": userDetails.user.meta.depth2Name[0],
                "depth2Id": userDetails.user.depth2[0],
                "depth3Name": userDetails.user.meta.depth3Name[0],
                "depth3Id": userDetails.user.depth3[0],
                "depth4Name": userDetails.user.meta.depth4Name[0],
                "depth4Id": userDetails.user.depth4[0]
            }

        } else {
            return {
                "depth0Id": userDetails.user.depth0,
                "depth0Name": userDetails.user.meta.depth0Name,
                "depth1Name": userDetails.user.meta.depth1Name[0],
                "depth1Id": userDetails.user.depth1[0],
                "depth2Name": userDetails.user.meta.depth2Name[0],
                "depth2Id": userDetails.user.depth2[0],
                "depth3Name": userDetails.user.meta.depth3Name[0],
                "depth3Id": userDetails.user.depth3[0],
                "depth4Name": userDetails.user.meta.depth4Name[0],
                "depth4Id": userDetails.user.depth4[0]
            }
        }

    }

    private populateUserDetails(userDetails: Node) {
        console.log("TEST1", userDetails);
        if (userDetails && this.getUserDetails(userDetails, "depth0Id")) {
            console.log("TEST", userDetails);

            let testUser = new User();
            console.log("USER TEST", testUser);

            this.populateUser(userDetails);
        }
    }

    getUserDetails(userDetails: Node, key: string) {
        let detail = userDetails.findNode("CommonFields.Authentication.UserDetails." + key);
        console.log("DETAILS", detail, key);
        if (detail) {
            console.log("VALUE", detail.getValue(), detail.value)
            return detail.getValue();
        } else {
            return null;
        }
    }

    public logEvents(node) {
        console.log("Init Node Logging Event");
        console.log(node);
        if (node && node.isObject) {
            node.forEachNode(node1 => {
                this.logEvents(node1);
            })
        }
        let value = null;
        if (node.defaultKey) {
            value = this.tra.transform(node.defaultKey);
        } else {
            value = node.getValue();
        }
        console.log(node.name);
        console.log(value);
        this.logEvent(node.name, value);
    }

    populateEventData(key: string, value: string) {
        this.eventData.set(key, value);
    }

    processEventData() {
        this.eventData.forEach((value, key) => {
        });
    }

    populateUser(userDetails: any) {
        let user = new User();
        user.depth0 = this.getUserDetails(userDetails, "depth0Id");
        user.depth = [parseInt(this.getUserDetails(userDetails, "depth"))];

        user.meta = new Meta();
        user.meta.firstName = this.getUserDetails(userDetails, "depthFirstName");
        user.meta.lastName = this.getUserDetails(userDetails, "depthLastName");
        user.meta.depth0Id = this.getUserDetails(userDetails, "depth0Id");
        user.meta.depth0Name = this.getUserDetails(userDetails, "depth0Name");

        if (this.getUserDetails(userDetails, "depth1Name")) {
            user.depth1 = [this.getUserDetails(userDetails, "depth1Name")];
            user.meta.depth1Name = [this.getUserDetails(userDetails, "depth1Name")];
        }
        if (this.getUserDetails(userDetails, "depth2Name")) {
            user.depth2 = [this.getUserDetails(userDetails, "depth2Name")];
            user.meta.depth2Name = [this.getUserDetails(userDetails, "depth2Name")];
        }
        if (this.getUserDetails(userDetails, "depth3Name")) {
            user.depth3 = [this.getUserDetails(userDetails, "depth3Name")];
            user.meta.depth3Name = [this.getUserDetails(userDetails, "depth3Name")];
        }
        if (this.getUserDetails(userDetails, "depth4Name")) {
            user.depth4 = [this.getUserDetails(userDetails, "depth4Name")];
            user.meta.depth4Name = [this.getUserDetails(userDetails, "depth4Name")];
        }

        this.userDetails = {
            "user": user,
            "x-platform-login": "dataswarm-access-by-key"
        }
    }

}

class User {
    depth0: string;
    depth: Array<number>;
    depth1: Array<String>;
    depth2: Array<String>;
    depth3: Array<String>;
    depth4: Array<String>;
    meta: Meta;

}

export class Meta {
    firstName: string;
    lastName: string;
    depth0Id: string;
    depth0Name: string;

    depth1Name: Array<String>;
    depth2Name: Array<String>;
    depth3Name: Array<String>;
    depth4Name: Array<String>;

    birthday = {
        "day": "1",
        "month": "1"
    };

    workAnniversary = {
        "day": "1",
        "month": "2",
        "year": "2000"
    };
}
