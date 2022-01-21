export interface AuthStoreInterface {
  user: UserInterface | null;
}

export interface UserInterface {
  id: number;
  name: string;
}