import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';
import { Principal } from 'app/core';
import { RequirementKeralaRescueService } from './requirement-kerala-rescue.service';

@Component({
    selector: 'jhi-requirement-kerala-rescue',
    templateUrl: './requirement-kerala-rescue.component.html'
})
export class RequirementKeralaRescueComponent implements OnInit, OnDestroy {
    requirements: IRequirementKeralaRescue[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private requirementService: RequirementKeralaRescueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.requirementService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IRequirementKeralaRescue[]>) => (this.requirements = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.requirementService.query().subscribe(
            (res: HttpResponse<IRequirementKeralaRescue[]>) => {
                this.requirements = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRequirements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRequirementKeralaRescue) {
        return item.id;
    }

    registerChangeInRequirements() {
        this.eventSubscriber = this.eventManager.subscribe('requirementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
