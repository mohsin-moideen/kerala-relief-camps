/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { CampKeralaRescueUpdateComponent } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue-update.component';
import { CampKeralaRescueService } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue.service';
import { CampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

describe('Component Tests', () => {
    describe('CampKeralaRescue Management Update Component', () => {
        let comp: CampKeralaRescueUpdateComponent;
        let fixture: ComponentFixture<CampKeralaRescueUpdateComponent>;
        let service: CampKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [CampKeralaRescueUpdateComponent]
            })
                .overrideTemplate(CampKeralaRescueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampKeralaRescueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampKeralaRescueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CampKeralaRescue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.camp = entity;
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
                    const entity = new CampKeralaRescue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.camp = entity;
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
