import { Adres } from './adres';

export interface User {
  uid: string;
  email: string;
  adress?: string;
  phone?: string;
  photoURL?: string;
  displayName?: string;
}
