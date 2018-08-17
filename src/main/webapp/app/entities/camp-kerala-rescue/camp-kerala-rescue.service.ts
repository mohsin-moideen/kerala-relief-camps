import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICampKeralaRescue } from 'app/shared/model/camp-kerala-rescue.model';

type EntityResponseType = HttpResponse<ICampKeralaRescue>;
type EntityArrayResponseType = HttpResponse<ICampKeralaRescue[]>;

@Injectable({ providedIn: 'root' })
export class CampKeralaRescueService {
    private resourceUrl = SERVER_API_URL + 'api/camps';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/camps';

    constructor(private http: HttpClient) {}

    create(camp: ICampKeralaRescue): Observable<EntityResponseType> {
        return this.http.post<ICampKeralaRescue>(this.resourceUrl, camp, { observe: 'response' });
    }

    update(camp: ICampKeralaRescue): Observable<EntityResponseType> {
        return this.http.put<ICampKeralaRescue>(this.resourceUrl, camp, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICampKeralaRescue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICampKeralaRescue[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICampKeralaRescue[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
