export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  password: string;
  roles?: {name: string}[];
  permiso?: string[];
}
