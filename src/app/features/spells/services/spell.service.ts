import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {PagedSpells, SpellDetails, SpellDetailsForm} from "../models/spell.model";
import {ISpellForm} from "../form/spell.form";

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private apiUrl = `${environment.apiUrl}/spells`;

  constructor(private http: HttpClient) {}

  getAllSpells(params: any, page: number = 0, pageSize: number = 20): Observable<PagedSpells> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get<PagedSpells>(this.apiUrl, { params: httpParams });
  }

  getSpellDetails(id: number): Observable<SpellDetails> {
    return this.http.get<SpellDetails>(`${this.apiUrl}/${id}`);
  }

  getSpellDetailsForm(id: number): Observable<SpellDetailsForm> {
    return this.http.get<SpellDetailsForm>(`${this.apiUrl}/form/${id}`);
  }

  addSpell(spell: ISpellForm): Observable<SpellDetails> {
    return this.http.post<SpellDetails>(this.apiUrl, spell);
  }

  updateSpell(id: number, spell: ISpellForm): Observable<SpellDetails> {
    return this.http.put<SpellDetails>(`${this.apiUrl}/${id}`, spell);
  }

  deleteSpell(id: number): Observable<SpellDetails> {
    return this.http.delete<SpellDetails>(`${this.apiUrl}/${id}`);
  }
}
