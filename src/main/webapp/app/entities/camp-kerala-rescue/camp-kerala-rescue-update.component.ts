import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';
import { CampKeralaRescueService } from './camp-kerala-rescue.service';
import { ILocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';
import { LocationKeralaRescueService } from 'app/entities/location-kerala-rescue';

@Component({
    selector: 'jhi-camp-kerala-rescue-update',
    templateUrl: './camp-kerala-rescue-update.component.html'
})
export class CampKeralaRescueUpdateComponent implements OnInit {
    private _camp: ICampKeralaRescue;
    isSaving: boolean;

    locations: ILocationKeralaRescue[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private campService: CampKeralaRescueService,
        private locationService: LocationKeralaRescueService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ camp }) => {
            this.camp = camp;
        });
        this.locationService.query({ filter: 'camp-is-null' }).subscribe(
            (res: HttpResponse<ILocationKeralaRescue[]>) => {
                if (!this.camp.location || !this.camp.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.camp.location.id).subscribe(
                        (subRes: HttpResponse<ILocationKeralaRescue>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.camp.id !== undefined) {
            this.subscribeToSaveResponse(this.campService.update(this.camp));
        } else {
            this.subscribeToSaveResponse(this.campService.create(this.camp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICampKeralaRescue>>) {
        result.subscribe((res: HttpResponse<ICampKeralaRescue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocationKeralaRescue) {
        return item.id;
    }
    get camp() {
        return this._camp;
    }

    set camp(camp: ICampKeralaRescue) {
        this._camp = camp;
    }
}
