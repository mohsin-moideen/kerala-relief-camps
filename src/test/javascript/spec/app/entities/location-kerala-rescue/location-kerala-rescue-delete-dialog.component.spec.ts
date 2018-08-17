/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KeralaReliefCampsTestModule } from '../../../test.module';
import { LocationKeralaRescueDeleteDialogComponent } from 'app/entities/location-kerala-rescue/location-kerala-rescue-delete-dialog.component';
import { LocationKeralaRescueService } from 'app/entities/location-kerala-rescue/location-kerala-rescue.service';

describe('Component Tests', () => {
    describe('LocationKeralaRescue Management Delete Component', () => {
        let comp: LocationKeralaRescueDeleteDialogComponent;
        let fixture: ComponentFixture<LocationKeralaRescueDeleteDialogComponent>;
        let service: LocationKeralaRescueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KeralaReliefCampsTestModule],
                declarations: [LocationKeralaRescueDeleteDialogComponent]
            })
                .overrideTemplate(LocationKeralaRescueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationKeralaRescueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationKeralaRescueService);
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
