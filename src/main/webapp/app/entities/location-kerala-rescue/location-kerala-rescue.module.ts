import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeralaReliefCampsSharedModule } from 'app/shared';
import {
    LocationKeralaRescueComponent,
    LocationKeralaRescueDetailComponent,
    LocationKeralaRescueUpdateComponent,
    LocationKeralaRescueDeletePopupComponent,
    LocationKeralaRescueDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [KeralaReliefCampsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationKeralaRescueComponent,
        LocationKeralaRescueDetailComponent,
        LocationKeralaRescueUpdateComponent,
        LocationKeralaRescueDeleteDialogComponent,
        LocationKeralaRescueDeletePopupComponent
    ],
    entryComponents: [
        LocationKeralaRescueComponent,
        LocationKeralaRescueUpdateComponent,
        LocationKeralaRescueDeleteDialogComponent,
        LocationKeralaRescueDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KeralaReliefCampsLocationKeralaRescueModule {}
