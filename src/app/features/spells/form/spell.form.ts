import { Validators } from "@angular/forms";

export interface ISpellForm {
  classLevels: { [key: number]: number };
  domainLevels: { [key: number]: number };
  name: string;
  school: string;
  schoolComplement?: string;
  description: string;
  savingThrow?: string;
  components: string;
  castingTime: string;
  range: string;
  effect?: string;
  duration: string;
  magicResistance?: string;
  targets?: string;
  ruleBookId: number;
  page: number;
}

export const SPELL_FORM = {
  'classLevels': [{}, [Validators.required]],
  'domainLevels': [{}, [Validators.required]],
  'name': ['', [Validators.required, Validators.minLength(3)]],
  'school': ['', [Validators.required]],
  'schoolComplement': [''],
  'description': ['', [Validators.required, Validators.minLength(10)]],
  'savingThrow': [''],
  'components': ['', [Validators.required]],
  'castingTime': ['', [Validators.required]],
  'range': ['', [Validators.required]],
  'effect': [''],
  'duration': ['', [Validators.required]],
  'magicResistance': [''],
  'targets': [''],
  'ruleBookId': [null, [Validators.required, Validators.min(1)]],
  'page': [null, [Validators.required, Validators.min(1)]]
}
