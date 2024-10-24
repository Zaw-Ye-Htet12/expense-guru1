export interface User {
  _id?: string;
  username?:string,
  email: string;
  password: string;
  confirmPassword?:string,
  isVerified?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
}

export interface EditUser{
  id:string,
  username:string;
  email:string;
  password:string;
  confirmPassword:string
}