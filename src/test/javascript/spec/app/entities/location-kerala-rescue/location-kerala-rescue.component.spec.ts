/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { LocationKeralaRescueComponent } from 'app/entities/location-kerala-rescue/location-kerala-rescue.component';
import { LocationKeralaRescueService } from 'app/entities/location-kerala-rescue/location-kerala-rescue.service';
import { LocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';

describe('Component Tests', () => {
    describe('LocationKeralaRescue Management Component', () => {
        let comp: LocationKeralaRescueComponent;
        let fixture: ComponentFixture<LocationKeralaRescueComponent>;
        let service: LocationKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [LocationKeralaRescueComponent],
                providers: []
            })
                .overrideTemplate(LocationKeralaRescueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationKeralaRescueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationKeralaRescueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocationKeralaRescue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
