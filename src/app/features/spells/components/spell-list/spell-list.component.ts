import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { PagedSpells, SpellParams, SpellShort } from "../../models/spell.model";
import { SpellService } from "../../services/spell.service";
import { AuthService } from "../../../auth/services/auth.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { UserRole } from "../../../auth/models/auth";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of, tap, BehaviorSubject } from "rxjs";
import { TableLazyLoadEvent, TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ChipModule } from "primeng/chip";
import { NgForOf, NgIf } from "@angular/common";
import { CheckboxModule } from "primeng/checkbox";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { CharacterClassService } from "../../../character-class/services/character-class.service";
import { DomainService } from "../../../domain/services/domain.service";

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [
    TableModule,
    Button,
    ConfirmDialogModule,
    ToastModule,
    ChipModule,
    NgForOf,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    NgIf
  ],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.scss'
})
export class SpellListComponent implements OnInit {
  spells = signal<SpellShort[]>([]);
  totalRecords = signal<number>(0);
  loading = signal<boolean>(true);
  canEdit = signal<boolean>(false);
  showFilter = signal<boolean>(false);
  filterForm: FormGroup;

  private classesSubject = new BehaviorSubject<any[]>([]);
  classes = toSignal(this.classesSubject);

  private domainsSubject = new BehaviorSubject<any[]>([]);
  domains = toSignal(this.domainsSubject);

  private spellService = inject(SpellService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);
  private characterClassService = inject(CharacterClassService);
  private domainService = inject(DomainService);

  constructor() {
    this.filterForm = this.fb.group({
      name: [''],
      class: [''],
      domain: [''],
      level: [''],
      school: [''],
      description: [''],
      effect: [''],
      verbalComponents: [false],
      materialComponents: [false],
      somaticComponents: [false],
      focusComponents: [false],
      experienceComponents: [false]
    });

    effect(() => {
      this.loadClasses();
      this.loadDomains();
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.canEdit.set(user?.user.role === UserRole.ADMIN || user?.user.role === UserRole.CONTRIBUTOR);
    });
  }

  loadClasses() {
    this.characterClassService.getAllClasses().pipe(
      tap(response => this.classesSubject.next(response.content)),
      catchError(error => {
        console.error('Error loading classes', error);
        return of({ content: [] });
      })
    ).subscribe();
  }

  loadDomains() {
    this.domainService.getAllDomains().pipe(
      tap(response => this.domainsSubject.next(response.content)),
      catchError(error => {
        console.error('Error loading domains', error);
        return of({ content: [] });
      })
    ).subscribe();
  }

  toggleFilter() {
    this.showFilter.update(v => !v);
  }

  applyFilter() {
    this.loadSpells({ first: 0, rows: 20 });
  }

  resetFilter() {
    this.filterForm.reset({
      verbalComponents: false,
      materialComponents: false,
      somaticComponents: false,
      focusComponents: false,
      experienceComponents: false
    });
    this.loadSpells({ first: 0, rows: 20 });
  }

  loadSpells(event: TableLazyLoadEvent) {
    this.loading.set(true);
    const page = event.first !== undefined ? Math.floor(event.first / (event.rows ?? 20)) : 0;
    const pageSize = event.rows ?? 20;

    let params: SpellParams = this.filterForm.value;

    this.spellService.getAllSpells(params, page, pageSize).pipe(
      tap((response: PagedSpells) => {
        this.spells.set(response.content);
        this.totalRecords.set(response.totalElements);
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('Error loading spells', error);
        this.loading.set(false);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load spells'});
        return of({ content: [], totalElements: 0 });
      })
    ).subscribe();
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
        this.spellService.deleteSpell(id).pipe(
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
        ).subscribe();
      }
    });
  }

  addNewSpell() {
    // Implement navigation to add new spell page
  }
}
