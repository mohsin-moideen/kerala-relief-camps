import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeralaReliefCampsSharedModule } from 'app/shared';
import {
    RequirementKeralaRescueComponent,
    RequirementKeralaRescueDetailComponent,
    RequirementKeralaRescueUpdateComponent,
    RequirementKeralaRescueDeletePopupComponent,
    RequirementKeralaRescueDeleteDialogComponent,
    requirementRoute,
    requirementPopupRoute
} from './';

const ENTITY_STATES = [...requirementRoute, ...requirementPopupRoute];

@NgModule({
    imports: [KeralaReliefCampsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequirementKeralaRescueComponent,
        RequirementKeralaRescueDetailComponent,
        RequirementKeralaRescueUpdateComponent,
        RequirementKeralaRescueDeleteDialogComponent,
        RequirementKeralaRescueDeletePopupComponent
    ],
    entryComponents: [
        RequirementKeralaRescueComponent,
        RequirementKeralaRescueUpdateComponent,
        RequirementKeralaRescueDeleteDialogComponent,
        RequirementKeralaRescueDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KeralaReliefCampsRequirementKeralaRescueModule {}
