import { NgModule } from '@angular/core';

import { KeralaReliefCampsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [KeralaReliefCampsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [KeralaReliefCampsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class KeralaReliefCampsSharedCommonModule {}
