import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RuleBook} from "../models/rule-book.model";

@Injectable({
  providedIn: 'root'
})
export class RuleBookService {

  private apiUrl = `${environment.apiUrl}/rulebooks`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<RuleBook[]> {
    return this.http.get<RuleBook[]>(this.apiUrl);
  }

}
