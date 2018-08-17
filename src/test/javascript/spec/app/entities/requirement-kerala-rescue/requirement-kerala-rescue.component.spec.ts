/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { RequirementKeralaRescueComponent } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue.component';
import { RequirementKeralaRescueService } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue.service';
import { RequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

describe('Component Tests', () => {
    describe('RequirementKeralaRescue Management Component', () => {
        let comp: RequirementKeralaRescueComponent;
        let fixture: ComponentFixture<RequirementKeralaRescueComponent>;
        let service: RequirementKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [RequirementKeralaRescueComponent],
                providers: []
            })
                .overrideTemplate(RequirementKeralaRescueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequirementKeralaRescueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementKeralaRescueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RequirementKeralaRescue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.requirements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
