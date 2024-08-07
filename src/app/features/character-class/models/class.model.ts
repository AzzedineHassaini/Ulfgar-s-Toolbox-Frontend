export interface PagedClasses {
  content: Class[];
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface Class {
  id: number;
  name: string;
  image: string;
}
