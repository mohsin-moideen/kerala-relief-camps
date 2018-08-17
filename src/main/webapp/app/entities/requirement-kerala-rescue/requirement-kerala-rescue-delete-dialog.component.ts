import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';
import { RequirementKeralaRescueService } from './requirement-kerala-rescue.service';

@Component({
    selector: 'jhi-requirement-kerala-rescue-delete-dialog',
    templateUrl: './requirement-kerala-rescue-delete-dialog.component.html'
})
export class RequirementKeralaRescueDeleteDialogComponent {
    requirement: IRequirementKeralaRescue;

    constructor(
        private requirementService: RequirementKeralaRescueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requirementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requirementListModification',
                content: 'Deleted an requirement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-requirement-kerala-rescue-delete-popup',
    template: ''
})
export class RequirementKeralaRescueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requirement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RequirementKeralaRescueDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.requirement = requirement;
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
