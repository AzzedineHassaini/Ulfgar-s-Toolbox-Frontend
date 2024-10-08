export interface PagedSpells {
  content: SpellShort[];
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface SpellShort {
  id: number;
  name: string;
  school: string;
  schoolImage: string;
  components: string;
  classLevels: string;
  domainLevels: string;
}

export interface SpellDetails {
  id: number;
  name: string;
  school: string;
  schoolImage: string;
  schoolComplement: string;
  description: string;
  savingThrow: string;
  castingTime: string;
  range: string;
  targets: string;
  effect: string;
  duration: string;
  spellResistance: string;
  components: string;
  classLevels: string;
  domainLevels: string;
  ruleBookId: number;
  page: number;
  bookName: string;
  bookShortName: string;
}

export interface SpellDetailsForm {
  id: number;
  name: string;
  school: string;
  schoolImage: string;
  schoolComplement: string;
  description: string;
  savingThrow: string;
  castingTime: string;
  range: string;
  targets: string;
  effect: string;
  duration: string;
  spellResistance: string;
  components: string;
  classLevels: {[key: number]: number };
  domainLevels: {[key: number]: number };
  ruleBookId: number;
  page: number;
  bookName: string;
  bookShortName: string;
}


export interface SpellParams {
  class?: string;
  domain?: string;
  minLevel?: string;
  maxLevel?: string;
  name?: string;
  school?: string;
  description?: string;
  effect?: string;
  verbalComponents?: boolean;
  materialComponents?: boolean;
  somaticComponents?: boolean;
  focusComponents?: boolean;
  experienceComponents?: boolean;
}

export interface ClassLevel {
  id: number;
  level: number;
}

export interface DomainLevel {
  id: number;
  level: number;
}
