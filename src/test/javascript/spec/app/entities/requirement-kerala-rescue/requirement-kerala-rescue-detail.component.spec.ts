/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { RequirementKeralaRescueDetailComponent } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue-detail.component';
import { RequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

describe('Component Tests', () => {
    describe('RequirementKeralaRescue Management Detail Component', () => {
        let comp: RequirementKeralaRescueDetailComponent;
        let fixture: ComponentFixture<RequirementKeralaRescueDetailComponent>;
        const route = ({ data: of({ requirement: new RequirementKeralaRescue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [RequirementKeralaRescueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RequirementKeralaRescueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequirementKeralaRescueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.requirement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
