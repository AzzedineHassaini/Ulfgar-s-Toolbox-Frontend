export interface PagedSpells {
  content: SpellShort[];
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface SpellShort {
  id: number;
  name: string;
  levels: string;
  school: string;
  components: string;
  classLevels: string;
  domainLevels: string;
}

export interface SpellDetails {
  id: number;
  name: string;
  levels: string;
  school: string;
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
}

export interface SpellParams {
  class?: string;
  domain?: string;
  level?: string;
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
