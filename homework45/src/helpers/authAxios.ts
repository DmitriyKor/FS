import axios, { type AxiosInstance } from "axios";
import { AUTH_TOKEN_STORAGE_NAME } from "./auth";

export class AuthAxios {
  public instance: AxiosInstance;
  public token: string | null = null;

  constructor() {
    
    this.instance = axios.create();
    this.instance.interceptors.response.use(
      response => response,
      error => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
          // Handle unauthorized access
          console.log("Unauthorized access");
          //this.forwardToLogin();

        } else if (status === 404) {
          // Handle not found errors
          console.log("Post not found");
        } else {
          // Handle other errors
          console.error("An error occurred:", error);
        }

        return Promise.reject(error);
      }
    )
  }

  public getTokenFromStorage(): boolean {
    this.token = localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
    if (this.token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
    return !!this.token;
  }

  public setToken(token:string):void {
    this.token=token;
    localStorage.setItem(AUTH_TOKEN_STORAGE_NAME, this.token);
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  }

  // private forwardToLogin():void {
  //     const dispatch = useDispatch();
  //     const navigate = useNavigate();
  //     dispatch(resetUser());
  //     navigate('/login');
  // }

}

export const authAxios = new AuthAxios();

