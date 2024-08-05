import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedDomains} from "../models/domain.model";

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private apiUrl = `${environment.apiUrl}/domains`;

  constructor(private http: HttpClient) {}

  getPagedDomains(params: any, page: number = 0, pageSize: number = 20): Observable<PagedDomains> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get<PagedDomains>(this.apiUrl, { params: httpParams });
  }

  getAllDomains(): Observable<PagedDomains> {
    return this.http.get<PagedDomains>(this.apiUrl);
  }

}
