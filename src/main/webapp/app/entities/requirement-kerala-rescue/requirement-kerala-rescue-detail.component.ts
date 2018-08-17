import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

@Component({
    selector: 'jhi-requirement-kerala-rescue-detail',
    templateUrl: './requirement-kerala-rescue-detail.component.html'
})
export class RequirementKeralaRescueDetailComponent implements OnInit {
    requirement: IRequirementKeralaRescue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requirement }) => {
            this.requirement = requirement;
        });
    }

    previousState() {
        window.history.back();
    }
}
