import type { ProColumns } from "@ant-design/pro-components";

export interface GithubIssueItem {
  id: string;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
  updated_at: string;
}

export type GithubIssueColumns = ProColumns<GithubIssueItem>[];
