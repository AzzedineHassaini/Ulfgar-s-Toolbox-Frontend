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
  spellResistance?: string;
  targets?: string;
  ruleBookId: number;
  page: number;
}

export const SPELL_FORM = {
  'classLevels': [{}],
  'domainLevels': [{}],
  'name': ['', [Validators.required]],
  'school': ['', [Validators.required]],
  'schoolComplement': [''],
  'description': ['', [Validators.required]],
  'savingThrow': [''],
  'components': [''],
  'castingTime': [''],
  'range': [''],
  'effect': [''],
  'duration': [''],
  'spellResistance': [''],
  'targets': [''],
  'ruleBookId': [null, [Validators.required, Validators.min(1)]],
  'page': [null, [Validators.required, Validators.min(1)]]
}
