import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KeralaReliefCampsCampKeralaRescueModule } from './camp-kerala-rescue/camp-kerala-rescue.module';
import { KeralaReliefCampsLocationKeralaRescueModule } from './location-kerala-rescue/location-kerala-rescue.module';
import { KeralaReliefCampsRequirementKeralaRescueModule } from './requirement-kerala-rescue/requirement-kerala-rescue.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        KeralaReliefCampsCampKeralaRescueModule,
        KeralaReliefCampsLocationKeralaRescueModule,
        KeralaReliefCampsRequirementKeralaRescueModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KeralaReliefCampsEntityModule {}
