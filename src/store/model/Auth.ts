export enum AuthEnumType {
  login = 'login',
  signup = 'signup',
}

export interface Auth {
  type: AuthEnumType;
  isLoggedIn: boolean;
}
