export interface TableLabel {
  name: string;
  color: string;
}

export interface TableItem {
  id: string;
  number: number;
  title: string;
  labels: TableLabel[];
  state: string;
  created_at: string;
  updated_at: string;
}

export interface TableResponse {
  data: TableItem[];
  code: number;
}
