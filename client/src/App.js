import Home from "./pages/Home";
import LoginComponent from "./components/login/LoginComponent";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/main/Main";
import MarketPlace from "./pages/main/MarketPlace";
import MyCourses from "./pages/main/MyCourses";
import ProductDetails from "./pages/main/ProductDetails";
import Admin from "./pages/Admin/Admin";
import AddCourse from "./pages/AddCourse/AddCourse";
import MaketplacePreview from "./pages/MaketplacePreview";
import EditCourse from "./pages/EditCourse/EditCourse";
import ErrorPage from "./pages/main/error";
import Profile from "./components/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import useCoursesStore from "./ZustandStore/store";
import "./App.css";
import Navbar from "components/navbar/navbar";

function App() {
  const { currentUser } = useCoursesStore((state) => state);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route
          path="login"
          element={currentUser ? <Navigate to="/dashboard/marketplace" /> : <LoginComponent />}
        />
        <Route path="notfound" element={<ErrorPage />} />
        <Route path="marketplace" element={<MaketplacePreview />} />
        <Route path="Dashboard" element={currentUser ? <Main /> : <Navigate to="/login" />}>
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="marketplace/:id" element={<MarketPlace />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="productdetails/:id" element={<ProductDetails />} />
          <Route
            path="admin"
            element={currentUser?.admin ? <Admin /> : <Navigate to="/Dashboard/marketplace" />}
          />
          <Route
            path="addcourse"
            element={currentUser?.admin ? <AddCourse /> : <Navigate to="/Dashboard/marketplace" />}
          />
          <Route
            path="editcourse/:id"
            element={currentUser?.admin ? <EditCourse /> : <Navigate to="/Dashboard/marketplace" />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
