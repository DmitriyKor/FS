import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect, Suspense, lazy } from 'react';

//import { Wallet } from './pages/wallet';
const Wallet = lazy(() => import('./pages/wallet'));
//import { NotFound } from './pages/notFound';
const NotFound = lazy(() => import('./pages/notFound'));
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

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

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
        <GlobalStyle />

        <BrowserRouter>
          <Routes>
            {openRoutes.map((item) => <Route path={item.path} element={
              <>
                <Suspense fallback={<SuspensePage/>}>
                  {item.element}
                </Suspense>
              </>}
            />)}
            {user.data ?
              <>
                {protectedRoutes.map((item) => <Route path={item.path} element={
                  <>
                    <Suspense fallback={<SuspensePage/>}>
                      {item.element}
                    </Suspense>
                  </>}
                />)}
              </> :  <> </>
            }
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
