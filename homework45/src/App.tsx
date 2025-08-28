import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect, Suspense, lazy } from 'react';

//import { Wallet } from './pages/wallet';
const Wallet = lazy(() => import('./pages/wallet'));
//import { NotFound } from './pages/notFound';
//const NotFound = lazy(() => import('./pages/notFound'));
import { fetchCategories } from './store/category';
import { mainTheme } from './shared/styles/theme'
import { fetchHistory } from './store/history';
//import { Login } from './pages/login';
const Login = lazy(() => import('./pages/login'));
//import { Home } from './pages/home';
const Home = lazy(() => import('./pages/home'));
//import { Register } from './pages/register';
const Register = lazy(() => import('./pages/register'));
//import { Logout } from './pages/logout';
const Logout = lazy(() => import('./pages/logout'));
import { fetchUser } from './store/user';
import { GlobalStyle } from './shared/styles/styles';
import { authAxios } from './helpers/authAxios';
import SuspensePage from './pages/suspensePage';
import type { RootState } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const openRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Home /> },
]

const protectedRoutes = [
  { path: '/wallet', element: <Wallet /> },
]

 const clientId = "701484575722-6hl59r36cvcsf207nvmttuudg0tlen1p.apps.googleusercontent.com";
 const clientSecret = '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'

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  //const categories = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (authAxios.getTokenFromStorage()) { dispatch(fetchUser()) };
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchHistory());
  }, [user]);

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <GoogleOAuthProvider clientId={clientId} >

          <GlobalStyle/>

          <BrowserRouter>
            <Routes>
              {openRoutes.map((item) => <Route path={item.path} element={
                <>
                  <Suspense fallback={<SuspensePage />}>
                    {item.element}
                  </Suspense>
                </>}
              />)}
              {user.data ?
                <>
                  {protectedRoutes.map((item) => <Route path={item.path} element={
                    <>
                      <Suspense fallback={<SuspensePage />}>
                        {item.element}
                      </Suspense>
                    </>}
                  />)}
                </> : <> </>
              }
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
