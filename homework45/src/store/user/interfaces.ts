export interface IUserData {
  name: string;
  email: string;
  image: string;
  password: string;
  startBalance: number;
}

export interface IUser {
  data: IUserData | null;
  isLoading: boolean;
  error: string | null;
};

export interface IUserPassword {
  oldPassword: string;
  password: string;
}