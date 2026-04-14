export interface AuthLoaderData {
  isAdmin: boolean;
}

export interface UserInfo {
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  autoLogin?: boolean;
}

export interface TableItem {
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

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface LineChartData {
  year: string;
  value: number;
  category: string;
}
