import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

@Component({
    selector: 'jhi-camp-kerala-rescue-detail',
    templateUrl: './camp-kerala-rescue-detail.component.html'
})
export class CampKeralaRescueDetailComponent implements OnInit {
    camp: ICampKeralaRescue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ camp }) => {
            this.camp = camp;
        });
    }

    previousState() {
        window.history.back();
    }
}
