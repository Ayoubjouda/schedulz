import Home from './pages/Home';
import LoginComponent from './components/login/LoginComponent';
import SignUp from './pages/SignUp/SignUp';
import Main from './pages/main/Main';
import MarketPlace from './pages/main/MarketPlace';
import MyCourses from './pages/main/MyCourses';
import ProductDetails from './pages/main/ProductDetails';
import Admin from './pages/Admin/Admin';
import AddCourse from './pages/AddCourse/AddCourse';
import MaketplacePreview from './pages/MaketplacePreview';
import EditCourse from './pages/EditCourse/EditCourse';
import ErrorPage from './pages/main/error';
import Profile from './components/Profile/Profile';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import useCoursesStore from './ZustandStore/store';
import './App.css';
import Navbar from 'components/navbar/navbar';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import api from 'api/api';
import jwt_decode from 'jwt-decode';

function App() {
  const { setToken, setCurrentUser, currentUser } = useCoursesStore(
    (state) => state
  );
  const navigate = useNavigate();

  const Toast = useToast();
  const handleUserInfo = (token) => {
    if (token) {
      setToken(token);
      const user = jwt_decode(token);
      if (!user) throw Error('no current user');
      setCurrentUser(user);
      Toast({
        title: `Welcome ${user.username}`,
        description: 'Login Successful',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/dashboard/marketplace');
    }
  };
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      api
        .post('auth/googlesignin', {
          access_token: credentialResponse.credential,
        })
        .then((res) => {
          if (res.data?.access_token) {
            handleUserInfo(res?.data?.access_token);
          }
        })
        .catch((err) =>
          Toast({
            title: 'Login error.',
            description: err.response?.data?.message
              ? err.response?.data?.message
              : 'Google Network Error',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        );
    },
    onError: () => {
      Toast({
        title: 'Login error.',
        description: 'err',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });
  useEffect(() => {
    Toast({
      description: 'This page is still under development',
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="register"
          element={<SignUp />}
        />
        <Route
          path="login"
          element={
            currentUser ? (
              <Navigate to="/dashboard/marketplace" />
            ) : (
              <LoginComponent />
            )
          }
        />
        <Route
          path="notfound"
          element={<ErrorPage />}
        />
        <Route
          path="marketplace"
          element={<MarketPlace />}
        />
        <Route
          path="Dashboard"
          element={currentUser ? <Main /> : <Navigate to="/login" />}
        >
          <Route
            path="mycourses"
            element={<MyCourses />}
          />
          <Route
            path="productdetails/:id"
            element={<ProductDetails />}
          />
          <Route
            path="admin"
            element={
              currentUser?.admin ? (
                <Admin />
              ) : (
                <Navigate to="/Dashboard/marketplace" />
              )
            }
          />
          <Route
            path="addcourse"
            element={
              currentUser?.admin ? (
                <AddCourse />
              ) : (
                <Navigate to="/Dashboard/marketplace" />
              )
            }
          />
          <Route
            path="editcourse/:id"
            element={
              currentUser?.admin ? (
                <EditCourse />
              ) : (
                <Navigate to="/Dashboard/marketplace" />
              )
            }
          />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
