/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { RequirementKeralaRescueDeleteDialogComponent } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue-delete-dialog.component';
import { RequirementKeralaRescueService } from 'app/entities/requirement-kerala-rescue/requirement-kerala-rescue.service';

describe('Component Tests', () => {
    describe('RequirementKeralaRescue Management Delete Component', () => {
        let comp: RequirementKeralaRescueDeleteDialogComponent;
        let fixture: ComponentFixture<RequirementKeralaRescueDeleteDialogComponent>;
        let service: RequirementKeralaRescueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [RequirementKeralaRescueDeleteDialogComponent]
            })
                .overrideTemplate(RequirementKeralaRescueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequirementKeralaRescueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementKeralaRescueService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
