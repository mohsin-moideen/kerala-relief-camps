import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';
import { Principal } from 'app/core';
import { CampKeralaRescueService } from './camp-kerala-rescue.service';

@Component({
    selector: 'jhi-camp-kerala-rescue',
    templateUrl: './camp-kerala-rescue.component.html'
})
export class CampKeralaRescueComponent implements OnInit, OnDestroy {
    camps: ICampKeralaRescue[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private campService: CampKeralaRescueService,
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
            this.campService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICampKeralaRescue[]>) => (this.camps = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.campService.query().subscribe(
            (res: HttpResponse<ICampKeralaRescue[]>) => {
                this.camps = res.body;
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
        this.registerChangeInCamps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICampKeralaRescue) {
        return item.id;
    }

    registerChangeInCamps() {
        this.eventSubscriber = this.eventManager.subscribe('campListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
