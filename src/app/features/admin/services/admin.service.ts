import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRoleUpdateForm, User} from "../models/user.model";
import {PagedSpellHistory} from "../models/spell-history.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getSpellHistory(page: number = 0, pageSize: number = 20, sortField?: string, sortOrder?: number): Observable<PagedSpellHistory> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (sortField) {
      httpParams = httpParams.set('sortField', sortField);
    }
    if (sortOrder) {
      httpParams = httpParams.set('sortOrder', sortOrder.toString());
    }

    return this.http.get<PagedSpellHistory>(`${this.apiUrl}/spell-history`, { params: httpParams });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  updateUserRole(id: number, role: IRoleUpdateForm): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, role);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/delete/${id}`);
  }

}
