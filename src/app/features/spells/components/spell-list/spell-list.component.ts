import {Component, inject, OnInit} from '@angular/core';
import {PagedSpells, SpellShort} from "../../models/spell.model";
import {SpellService} from "../../services/spell.service";
import {AuthService} from "../../../auth/services/auth.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserRole} from "../../../auth/models/auth";
import {toSignal} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ChipModule} from "primeng/chip";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [
    TableModule,
    Button,
    ConfirmDialogModule,
    ToastModule,
    ChipModule,
    NgForOf
  ],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.scss'
})
export class SpellListComponent implements OnInit{
  spells: SpellShort[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  canEdit = false;

  private spellService = inject(SpellService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.canEdit = user?.user.role === UserRole.ADMIN || user?.user.role === UserRole.CONTRIBUTOR;
    });
  }

  loadSpells(event: TableLazyLoadEvent) {
    this.loading = true;
    const page = event.first !== undefined ? Math.floor(event.first / (event.rows ?? 20)) : 0;
    const pageSize = event.rows ?? 20;

    let params: any = {};
    if (event.sortField) {
      params['sortField'] = event.sortField;
      params['sortOrder'] = event.sortOrder === 1 ? 'asc' : 'desc';
    }

    if (event.filters) {
      Object.entries(event.filters).forEach(([key, value]) => {
        if (value && 'value' in value && value.value !== null) {
          params[key] = value.value;
        }
      });
    }

    this.spellService.getAllSpells(params, page, pageSize).subscribe(
      (response: PagedSpells) => {
        this.spells = response.content;
        this.totalRecords = response.totalElements;
        this.loading = false;
      },
      error => {
        console.error('Error loading spells', error);
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load spells'});
      }
    );
  }

  viewDetails(id: number) {
    // Implement navigation to spell details page
  }

  editSpell(id: number) {
    // Implement navigation to spell edit page
  }

  deleteSpell(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this spell?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteSpell$ = this.spellService.deleteSpell(id).pipe(
          tap({
            next: () => {
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Spell deleted'});
              this.loadSpells({first: 0, rows: 20});
            },
            error: (error) => {
              console.error('Error deleting spell', error);
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete spell'});
            }
          })
        );

        const deleteSpellSignal = toSignal(deleteSpell$, { initialValue: null });
        deleteSpellSignal(); // Trigger the deletion
      }
    });
  }

  addNewSpell() {
    // Implement navigation to add new spell page
  }
}
