export interface UserModel {
  name: string;
  email: string;
  password: string;
  roles?: {name: string}[];
  permiso?: string[];
}
