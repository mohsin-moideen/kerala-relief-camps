/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { CampKeralaRescueComponent } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue.component';
import { CampKeralaRescueService } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue.service';
import { CampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

describe('Component Tests', () => {
    describe('CampKeralaRescue Management Component', () => {
        let comp: CampKeralaRescueComponent;
        let fixture: ComponentFixture<CampKeralaRescueComponent>;
        let service: CampKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [CampKeralaRescueComponent],
                providers: []
            })
                .overrideTemplate(CampKeralaRescueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampKeralaRescueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampKeralaRescueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CampKeralaRescue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.camps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
