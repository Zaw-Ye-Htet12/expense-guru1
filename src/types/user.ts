export interface User {
  _id: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: string;
}
