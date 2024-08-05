export interface PagedDomains {
  content: Domain[];
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface Domain {
  id: number;
  name: string;
  power: string;
}

export interface DomainParam {
  name?: string;
  power?: string;
}
