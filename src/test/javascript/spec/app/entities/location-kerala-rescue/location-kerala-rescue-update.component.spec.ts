/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { LocationKeralaRescueUpdateComponent } from 'app/entities/location-kerala-rescue/location-kerala-rescue-update.component';
import { LocationKeralaRescueService } from 'app/entities/location-kerala-rescue/location-kerala-rescue.service';
import { LocationKeralaRescue } from 'app/shared/model/location-kerala-rescue.model';

describe('Component Tests', () => {
    describe('LocationKeralaRescue Management Update Component', () => {
        let comp: LocationKeralaRescueUpdateComponent;
        let fixture: ComponentFixture<LocationKeralaRescueUpdateComponent>;
        let service: LocationKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [LocationKeralaRescueUpdateComponent]
            })
                .overrideTemplate(LocationKeralaRescueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationKeralaRescueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationKeralaRescueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationKeralaRescue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationKeralaRescue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
