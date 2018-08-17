/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { RequirementKeralaRescueUpdateComponent } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue-update.component';
import { RequirementKeralaRescueService } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue.service';
import { RequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

describe('Component Tests', () => {
    describe('RequirementKeralaRescue Management Update Component', () => {
        let comp: RequirementKeralaRescueUpdateComponent;
        let fixture: ComponentFixture<RequirementKeralaRescueUpdateComponent>;
        let service: RequirementKeralaRescueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [RequirementKeralaRescueUpdateComponent]
            })
                .overrideTemplate(RequirementKeralaRescueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequirementKeralaRescueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementKeralaRescueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RequirementKeralaRescue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requirement = entity;
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
                    const entity = new RequirementKeralaRescue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requirement = entity;
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
