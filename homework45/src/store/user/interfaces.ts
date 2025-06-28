export interface IUser {
  name: String;
  email: String;
  image: String;
  password: String;
  startBalance: Number;
}

export interface IUserPassword {
  oldPassword : String;
  password : String;
}