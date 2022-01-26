export interface AuthStore {
  user: User | null;
}

export interface User {
  id: number;
  name: string;
}