import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';
import { CampKeralaRescueService } from './camp-kerala-rescue.service';

@Component({
    selector: 'jhi-camp-kerala-rescue-delete-dialog',
    templateUrl: './camp-kerala-rescue-delete-dialog.component.html'
})
export class CampKeralaRescueDeleteDialogComponent {
    camp: ICampKeralaRescue;

    constructor(private campService: CampKeralaRescueService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'campListModification',
                content: 'Deleted an camp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-camp-kerala-rescue-delete-popup',
    template: ''
})
export class CampKeralaRescueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ camp }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CampKeralaRescueDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.camp = camp;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
