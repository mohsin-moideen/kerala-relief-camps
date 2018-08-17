import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';
import { CampKeralaRescueService } from './camp-kerala-rescue.service';
import { CampKeralaRescueComponent } from './camp-kerala-rescue.component';
import { CampKeralaRescueDetailComponent } from './camp-kerala-rescue-detail.component';
import { CampKeralaRescueUpdateComponent } from './camp-kerala-rescue-update.component';
import { CampKeralaRescueDeletePopupComponent } from './camp-kerala-rescue-delete-dialog.component';
import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

@Injectable({ providedIn: 'root' })
export class CampKeralaRescueResolve implements Resolve<ICampKeralaRescue> {
    constructor(private service: CampKeralaRescueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((camp: HttpResponse<CampKeralaRescue>) => camp.body));
        }
        return of(new CampKeralaRescue());
    }
}

export const campRoute: Routes = [
    {
        path: 'camp-kerala-rescue',
        component: CampKeralaRescueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Camps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'camp-kerala-rescue/:id/view',
        component: CampKeralaRescueDetailComponent,
        resolve: {
            camp: CampKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Camps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'camp-kerala-rescue/new',
        component: CampKeralaRescueUpdateComponent,
        resolve: {
            camp: CampKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Camps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'camp-kerala-rescue/:id/edit',
        component: CampKeralaRescueUpdateComponent,
        resolve: {
            camp: CampKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Camps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campPopupRoute: Routes = [
    {
        path: 'camp-kerala-rescue/:id/delete',
        component: CampKeralaRescueDeletePopupComponent,
        resolve: {
            camp: CampKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Camps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
