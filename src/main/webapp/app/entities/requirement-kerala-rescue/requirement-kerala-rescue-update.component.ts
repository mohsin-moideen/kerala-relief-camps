import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';
import { RequirementKeralaRescueService } from './requirement-kerala-rescue.service';
import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';
import { CampKeralaRescueService } from 'app/entities/camp-kerala-rescue';

@Component({
    selector: 'jhi-requirement-kerala-rescue-update',
    templateUrl: './requirement-kerala-rescue-update.component.html'
})
export class RequirementKeralaRescueUpdateComponent implements OnInit {
    private _requirement: IRequirementKeralaRescue;
    isSaving: boolean;

    camps: ICampKeralaRescue[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private requirementService: RequirementKeralaRescueService,
        private campService: CampKeralaRescueService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requirement }) => {
            this.requirement = requirement;
        });
        this.campService.query().subscribe(
            (res: HttpResponse<ICampKeralaRescue[]>) => {
                this.camps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.requirement.id !== undefined) {
            this.subscribeToSaveResponse(this.requirementService.update(this.requirement));
        } else {
            this.subscribeToSaveResponse(this.requirementService.create(this.requirement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequirementKeralaRescue>>) {
        result.subscribe(
            (res: HttpResponse<IRequirementKeralaRescue>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCampById(index: number, item: ICampKeralaRescue) {
        return item.id;
    }
    get requirement() {
        return this._requirement;
    }

    set requirement(requirement: IRequirementKeralaRescue) {
        this._requirement = requirement;
    }
}
