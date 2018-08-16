export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

  lastSignIn: Date;
  lastIpAddress: string;

  active: boolean;
  photoUrl: string;
  location: string;
  variant: string;
}

export interface LoggedUser {
  user: User;
  isNew: boolean;
}
