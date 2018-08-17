import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';
import { LocationKeralaRescueService } from './location-kerala-rescue.service';
import { LocationKeralaRescueComponent } from './location-kerala-rescue.component';
import { LocationKeralaRescueDetailComponent } from './location-kerala-rescue-detail.component';
import { LocationKeralaRescueUpdateComponent } from './location-kerala-rescue-update.component';
import { LocationKeralaRescueDeletePopupComponent } from './location-kerala-rescue-delete-dialog.component';
import { ILocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';

@Injectable({ providedIn: 'root' })
export class LocationKeralaRescueResolve implements Resolve<ILocationKeralaRescue> {
    constructor(private service: LocationKeralaRescueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((location: HttpResponse<LocationKeralaRescue>) => location.body));
        }
        return of(new LocationKeralaRescue());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-kerala-rescue',
        component: LocationKeralaRescueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-kerala-rescue/:id/view',
        component: LocationKeralaRescueDetailComponent,
        resolve: {
            location: LocationKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-kerala-rescue/new',
        component: LocationKeralaRescueUpdateComponent,
        resolve: {
            location: LocationKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-kerala-rescue/:id/edit',
        component: LocationKeralaRescueUpdateComponent,
        resolve: {
            location: LocationKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-kerala-rescue/:id/delete',
        component: LocationKeralaRescueDeletePopupComponent,
        resolve: {
            location: LocationKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
