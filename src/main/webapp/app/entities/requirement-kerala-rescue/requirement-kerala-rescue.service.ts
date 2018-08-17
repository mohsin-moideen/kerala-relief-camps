import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequirementKeralaRescue } from 'app/shared/model/requirement-kerala-rescue.model';

type EntityResponseType = HttpResponse<IRequirementKeralaRescue>;
type EntityArrayResponseType = HttpResponse<IRequirementKeralaRescue[]>;

@Injectable({ providedIn: 'root' })
export class RequirementKeralaRescueService {
    private resourceUrl = SERVER_API_URL + 'api/requirements';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/requirements';

    constructor(private http: HttpClient) {}

    create(requirement: IRequirementKeralaRescue): Observable<EntityResponseType> {
        return this.http.post<IRequirementKeralaRescue>(this.resourceUrl, requirement, { observe: 'response' });
    }

    update(requirement: IRequirementKeralaRescue): Observable<EntityResponseType> {
        return this.http.put<IRequirementKeralaRescue>(this.resourceUrl, requirement, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRequirementKeralaRescue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRequirementKeralaRescue[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRequirementKeralaRescue[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
