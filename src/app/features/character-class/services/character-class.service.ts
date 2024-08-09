import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Class, PagedClasses} from "../models/class.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {

  private apiUrl = `${environment.apiUrl}/classes`;

  constructor(private http: HttpClient) {}

  getPagedClasses(page: number = 0, pageSize: number = 20): Observable<PagedClasses> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedClasses>(this.apiUrl, { params: httpParams });
  }

  getAllClasses(): Observable<PagedClasses> {
    return this.http.get<PagedClasses>(this.apiUrl);
  }

  getAllCasters(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl+'/caster');
  }

}
