import {Component, effect, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SpellService} from "../../services/spell.service";
import {CharacterClassService} from "../../../character-class/services/character-class.service";
import {DomainService} from "../../../domain/services/domain.service";
import {SpellSchoolService} from "../../../spell-schools/services/spell-school.service";
import {MessageService} from "primeng/api";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {BehaviorSubject, catchError, of, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {RuleBookService} from "../../../rule-books/services/rule-book.service";
import {ClassLevel, DomainLevel} from "../../models/spell.model";

@Component({
  selector: 'app-spell-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    Button,
    InputNumberModule
  ],
  templateUrl: './spell-form.component.html',
  styleUrl: './spell-form.component.scss'
})
export class SpellFormComponent implements OnInit {
  spellForm: FormGroup;
  isEditMode = false;
  spellId: number | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private spellService = inject(SpellService);
  private characterClassService = inject(CharacterClassService);
  private domainService = inject(DomainService);
  private spellSchoolService = inject(SpellSchoolService);
  private messageService = inject(MessageService);
  private ruleBookService = inject(RuleBookService);

  private classesSubject = new BehaviorSubject<any[]>([]);
  classes = toSignal(this.classesSubject);

  private domainsSubject = new BehaviorSubject<any[]>([]);
  domains = toSignal(this.domainsSubject);

  private schoolsSubject = new BehaviorSubject<any[]>([]);
  schools = toSignal(this.schoolsSubject);

  private ruleBookSubject = new BehaviorSubject<any[]>([]);
  ruleBooks = toSignal(this.ruleBookSubject);

  levelOptions = Array.from({length: 10}, (_, i) => ({ label: i.toString(), value: i }));

  constructor() {
    this.spellForm = this.spellForm = this.fb.group({
      name: ['', Validators.required],
      school: ['', Validators.required],
      schoolComplement: [''],
      description: ['', Validators.required],
      savingThrow: [''],
      castingTime: ['', Validators.required],
      range: ['', Validators.required],
      targets: [''],
      effect: [''],
      duration: ['', Validators.required],
      spellResistance: [''],
      components: ['', Validators.required],
      classLevels: this.fb.array([]),
      domainLevels: this.fb.array([]),
      ruleBookId: [null, Validators.required],
      page: [null, [Validators.required, Validators.min(1)]]
    });
    effect(() => {
      this.loadClasses();
      this.loadDomains();
      this.loadSchools();
      this.loadRuleBooks();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log("edit mode, id= "+params['id']);
        this.isEditMode = true;
        this.spellId = +params['id'];
        this.loadSpellData();
      } else {
        this.addClassLevel();
        this.addDomainLevel();
      }

    });
  }

  get classLevelsArray() {
    return this.spellForm.get('classLevels') as FormArray;
  }

  get domainLevelsArray() {
    return this.spellForm.get('domainLevels') as FormArray;
  }

  addClassLevel() {
    this.classLevelsArray.push(this.fb.group({
      id: [null, Validators.required],
      level: [null, [Validators.required, Validators.min(0), Validators.max(9)]]
    }));
  }

  removeClassLevel(index: number) {
    this.classLevelsArray.removeAt(index);
  }

  addDomainLevel() {
    this.domainLevelsArray.push(this.fb.group({
      id: [null, Validators.required],
      level: [null, [Validators.required, Validators.min(0), Validators.max(9)]]
    }));
  }

  removeDomainLevel(index: number) {
    this.domainLevelsArray.removeAt(index);
  }

  loadClasses() {
    this.characterClassService.getAllCasters().pipe(
      tap(response => this.classesSubject.next(response)),
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

  loadSchools() {
    this.spellSchoolService.getAllSchools().pipe(
      tap(response => this.schoolsSubject.next(response)),
      catchError(error => {
        console.error('Error loading schools', error);
        return of({ content: [] });
      })
    ).subscribe();
  }

  loadRuleBooks() {
    this.ruleBookService.getAllBooks().pipe(
      tap(response => this.ruleBookSubject.next(response)),
      catchError(error => {
        console.error('Error loading rule books', error);
        return of({ content: [] });
      })
    ).subscribe();
  }

  loadSpellData() {
    if (this.spellId) {
      this.spellService.getSpellDetailsForm(this.spellId).subscribe({
        next: (spell) => {

          console.log(spell)
          // Patch les valeurs de base du formulaire
          this.spellForm.patchValue({
            name: spell.name,
            school: spell.school,
            schoolImage: spell.schoolImage,
            schoolComplement: spell.schoolComplement,
            description: spell.description,
            savingThrow: spell.savingThrow,
            castingTime: spell.castingTime,
            range: spell.range,
            targets: spell.targets,
            effect: spell.effect,
            duration: spell.duration,
            spellResistance: spell.spellResistance,
            components: spell.components,
            ruleBookId: spell.ruleBookId,
            page: spell.page,
            bookName: spell.bookName,
            bookShortName: spell.bookShortName
          });

          // Patch les niveaux de classe et de domaine
          this.patchLevels(spell.classLevels, this.classLevelsArray);
          this.patchLevels(spell.domainLevels, this.domainLevelsArray);
        },
        error: (error) => {
          console.error('Error loading spell', error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load spell details'});
        }
      });
    }
  }

  private patchLevels(levels: {[key: number]: number}, formArray: FormArray) {
    // Réinitialiser le FormArray
    formArray.clear();

    // Ajouter chaque niveau au FormArray
    Object.entries(levels).forEach(([id, level]) => {
      formArray.push(this.fb.group({
        id: [+id],
        level: [level]
      }));
    });
  }

  onSubmit() {
    if (this.spellForm.valid) {
      const spellData = this.prepareSpellData();
      const operation = this.isEditMode
        ? this.spellService.updateSpell(this.spellId!, spellData)
        : this.spellService.addSpell(spellData);

      operation.subscribe({
        next: () => {
          this.messageService.add({severity:'success', summary: 'Success', detail: `Spell ${this.isEditMode ? 'updated' : 'added'} successfully`});
          this.router.navigate(['/spells']);
        },
        error: (error) => {
          console.error('Error saving spell', error);
          this.messageService.add({severity:'error', summary: 'Error', detail: `Failed to ${this.isEditMode ? 'update' : 'add'} spell`});
        }
      });
    }
  }

  prepareSpellData() {
    const formValue = this.spellForm.value;
    const classLevels: { [key: number]: number } = {};
    const domainLevels: { [key: number]: number } = {};

    formValue.classLevels.forEach((cl: ClassLevel) => {
      classLevels[cl.id] = cl.level;
    });

    formValue.domainLevels.forEach((dl: DomainLevel) => {
      domainLevels[dl.id] = dl.level;
    });

    return {
      ...formValue,
      classLevels,
      domainLevels
    };
  }

  cancel() {
    this.router.navigate(['/spells']);
  }
}
