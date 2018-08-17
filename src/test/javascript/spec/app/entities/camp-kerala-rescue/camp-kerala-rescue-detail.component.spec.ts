/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { CampKeralaRescueDetailComponent } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue-detail.component';
import { CampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

describe('Component Tests', () => {
    describe('CampKeralaRescue Management Detail Component', () => {
        let comp: CampKeralaRescueDetailComponent;
        let fixture: ComponentFixture<CampKeralaRescueDetailComponent>;
        const route = ({ data: of({ camp: new CampKeralaRescue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [CampKeralaRescueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CampKeralaRescueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampKeralaRescueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.camp).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
