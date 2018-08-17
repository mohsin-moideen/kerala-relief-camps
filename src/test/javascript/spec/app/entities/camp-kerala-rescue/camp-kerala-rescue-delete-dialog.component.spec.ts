/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { CampKeralaRescueDeleteDialogComponent } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue-delete-dialog.component';
import { CampKeralaRescueService } from 'app/entities/camp-kerala-rescue/camp-kerala-rescue.service';

describe('Component Tests', () => {
    describe('CampKeralaRescue Management Delete Component', () => {
        let comp: CampKeralaRescueDeleteDialogComponent;
        let fixture: ComponentFixture<CampKeralaRescueDeleteDialogComponent>;
        let service: CampKeralaRescueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [CampKeralaRescueDeleteDialogComponent]
            })
                .overrideTemplate(CampKeralaRescueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampKeralaRescueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampKeralaRescueService);
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
