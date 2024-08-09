export interface PagedSpellHistory {
  content: SpellHistory[];
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface SpellHistory {
  spellName: string;
  action: string;
  updatedTable: string;
  updatedField: string;
  oldValue: string;
  newValue: string;
  date: string;
  user: string;
}
