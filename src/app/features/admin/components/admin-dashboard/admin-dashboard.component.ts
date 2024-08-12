import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PagedSpellHistory, SpellHistory} from "../../models/spell-history.model";
import { User } from '../../models/user.model';
import {AdminService} from "../../services/admin.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {catchError, of, tap} from "rxjs";
import {RoleSelectorComponent} from "../role-selector/role-selector.component";

type SortableUserKey = keyof Pick<User, 'id' | 'email' | 'pseudo' | 'role'>;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DropdownModule, RoleSelectorComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private _activeTab: 'users' | 'spellHistory' = 'users';
  get activeTab(): 'users' | 'spellHistory' {
    return this._activeTab;
  }
  set activeTab(value: 'users' | 'spellHistory') {
    if (this._activeTab !== value) {
      this._activeTab = value;
      this.onTabChange();
    }
  }

  users: User[] = [];
  spellHistory: SpellHistory[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  sortField: SortableUserKey = 'id';
  sortOrder: 1 | -1 = 1; // 1 pour ascendant, -1 pour descendant

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadActiveTabData();
  }

  onTabChange() {
    this.loadActiveTabData();
  }

  loadActiveTabData() {
    this.loading = true;
    if (this.activeTab === 'users') {
      this.loadUsers();
    } else {
      this.loadInitialSpellHistory();
    }
  }

  loadUsers() {
    this.adminService.getAllUsers().pipe(
      tap(response => this.users = response),
      catchError(error => {
        console.error('Error loading classes', error);
        return of({ content: [] });
      })
    ).subscribe();
  }

  sortUsers(users: User[]): User[] {
    if (this.sortField) {
      return users.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField]) return -1 * this.sortOrder;
        if (a[this.sortField] > b[this.sortField]) return 1 * this.sortOrder;
        return 0;
      });
    }
    return users;
  }

  loadInitialSpellHistory() {
    this.loadSpellHistory({ first: 0, rows: 20, sortField: this.sortField, sortOrder: this.sortOrder });
  }

  loadSpellHistory(event: any) {
    this.loading = true;
    const page = event.first / event.rows;
    const pageSize = event.rows;
    this.sortField = event.sortField || this.sortField;
    this.sortOrder = event.sortOrder || this.sortOrder;

    this.adminService.getSpellHistory(page, pageSize, this.sortField, this.sortOrder).pipe(
      tap((response: PagedSpellHistory) => {
        this.spellHistory = response.content;
        this.totalRecords = response.totalElements;
        this.loading = false;
      }),
      catchError(error => {
        console.error('Error loading spell history', error);
        this.loading = false;
        return of({ content: [], totalElements: 0 });
      })
    ).subscribe();
  }

  updateUserRole(user: User, newRole: string) {
    this.adminService.updateUserRole(user.id, { role: newRole })
      .pipe(
        tap(response => this.users = this.sortUsers([...this.users])),
        catchError(error => {
          console.error('Error updating user', error);
          return of({ content: [] });
        })
      ).subscribe();
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id)
      .pipe(
        tap(response => this.users = this.users.filter(user => user.id !== id)),
        catchError(error => {
          console.error('Error deleting user', error);
          return of({ content: [] });
        })
      ).subscribe();
  }

  onSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.users = this.sortUsers([...this.users]);
  }
}
