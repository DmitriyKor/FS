export interface IUserData {
  name: string;
  email: string;
  image: string;
  startBalance: number;
}

export interface IUser {
  data: IUserData | null;
  password: string | null;
  isLoading: boolean;
  error: string | null | undefined;
};

export interface IUserPassword {
  oldPassword: string;
  password: string;
}