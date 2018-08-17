import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';
import { RequirementKeralaRescueService } from './requirement-kerala-rescue.service';
import { RequirementKeralaRescueComponent } from './requirement-kerala-rescue.component';
import { RequirementKeralaRescueDetailComponent } from './requirement-kerala-rescue-detail.component';
import { RequirementKeralaRescueUpdateComponent } from './requirement-kerala-rescue-update.component';
import { RequirementKeralaRescueDeletePopupComponent } from './requirement-kerala-rescue-delete-dialog.component';
import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

@Injectable({ providedIn: 'root' })
export class RequirementKeralaRescueResolve implements Resolve<IRequirementKeralaRescue> {
    constructor(private service: RequirementKeralaRescueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((requirement: HttpResponse<RequirementKeralaRescue>) => requirement.body));
        }
        return of(new RequirementKeralaRescue());
    }
}

export const requirementRoute: Routes = [
    {
        path: 'requirement-kerala-rescue',
        component: RequirementKeralaRescueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement-kerala-rescue/:id/view',
        component: RequirementKeralaRescueDetailComponent,
        resolve: {
            requirement: RequirementKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement-kerala-rescue/new',
        component: RequirementKeralaRescueUpdateComponent,
        resolve: {
            requirement: RequirementKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement-kerala-rescue/:id/edit',
        component: RequirementKeralaRescueUpdateComponent,
        resolve: {
            requirement: RequirementKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requirementPopupRoute: Routes = [
    {
        path: 'requirement-kerala-rescue/:id/delete',
        component: RequirementKeralaRescueDeletePopupComponent,
        resolve: {
            requirement: RequirementKeralaRescueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
