import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SpellSchool} from "../models/school.model";

@Injectable({
  providedIn: 'root'
})
export class SpellSchoolService {

  private apiUrl = `${environment.apiUrl}/spell-school`;

  constructor(private http: HttpClient) {}

  getAllSchools(): Observable<SpellSchool[]> {
    return this.http.get<SpellSchool[]>(this.apiUrl);
  }

}
