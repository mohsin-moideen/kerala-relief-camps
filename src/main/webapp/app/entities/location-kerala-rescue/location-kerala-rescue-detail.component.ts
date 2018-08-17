import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';

@Component({
    selector: 'jhi-location-kerala-rescue-detail',
    templateUrl: './location-kerala-rescue-detail.component.html'
})
export class LocationKeralaRescueDetailComponent implements OnInit {
    location: ILocationKeralaRescue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }
}
