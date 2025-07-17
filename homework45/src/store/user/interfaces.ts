export interface IUserData {
  id: string;
  name: string;
  email: string;
  image: string;
  startBalance: number;
}

export interface IUser {
  data: IUserData | null;
};

export interface IUserPassword {
  oldPassword: string;
  password: string;
}