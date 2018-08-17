import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeralaReliefCampsSharedModule } from 'app/shared';
import {
    CampKeralaRescueComponent,
    CampKeralaRescueDetailComponent,
    CampKeralaRescueUpdateComponent,
    CampKeralaRescueDeletePopupComponent,
    CampKeralaRescueDeleteDialogComponent,
    campRoute,
    campPopupRoute
} from './';

const ENTITY_STATES = [...campRoute, ...campPopupRoute];

@NgModule({
    imports: [KeralaReliefCampsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CampKeralaRescueComponent,
        CampKeralaRescueDetailComponent,
        CampKeralaRescueUpdateComponent,
        CampKeralaRescueDeleteDialogComponent,
        CampKeralaRescueDeletePopupComponent
    ],
    entryComponents: [
        CampKeralaRescueComponent,
        CampKeralaRescueUpdateComponent,
        CampKeralaRescueDeleteDialogComponent,
        CampKeralaRescueDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KeralaReliefCampsCampKeralaRescueModule {}
