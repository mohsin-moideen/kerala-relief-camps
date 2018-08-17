/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { LocationKeralaRescueDetailComponent } from 'app/entities/location-kerala-rescue/location-kerala-rescue-detail.component';
import { LocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';

describe('Component Tests', () => {
    describe('LocationKeralaRescue Management Detail Component', () => {
        let comp: LocationKeralaRescueDetailComponent;
        let fixture: ComponentFixture<LocationKeralaRescueDetailComponent>;
        const route = ({ data: of({ location: new LocationKeralaRescue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [LocationKeralaRescueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LocationKeralaRescueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationKeralaRescueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
