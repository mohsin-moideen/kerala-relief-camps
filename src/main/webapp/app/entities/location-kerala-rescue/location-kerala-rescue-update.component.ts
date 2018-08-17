import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';
import { LocationKeralaRescueService } from './location-kerala-rescue.service';

@Component({
    selector: 'jhi-location-kerala-rescue-update',
    templateUrl: './location-kerala-rescue-update.component.html'
})
export class LocationKeralaRescueUpdateComponent implements OnInit {
    private _location: ILocationKeralaRescue;
    isSaving: boolean;

    constructor(private locationService: LocationKeralaRescueService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationKeralaRescue>>) {
        result.subscribe(
            (res: HttpResponse<ILocationKeralaRescue>) => this.onSaveSuccess(),
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
    get location() {
        return this._location;
    }

    set location(location: ILocationKeralaRescue) {
        this._location = location;
    }
}
