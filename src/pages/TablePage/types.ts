export interface Label {
  name: string;
  color: string;
}

export interface GithubIssueItem {
  id: string;
  number: number;
  title: string;
  labels: Label[];
  state: string;
  created_at: string;
  updated_at: string;
}
