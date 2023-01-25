import Home from "./pages/Home";
import LoginComponent from "./components/login/LoginComponent";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/main/Main";
import MarketPlace from "./pages/main/MarketPlace";
import MyCourses from "./pages/main/MyCourses";
import ProductDetails from "./pages/main/ProductDetails";
import Admin from "./pages/Admin/Admin";
import AddCourse from "./pages/AddCourse/AddCourse";
import { Routes, Route, Navigate } from "react-router-dom";
import useProductStore from "./ZustandStore/store";
import "./App.css";

function App() {
  const { access_token } = useProductStore((state) => state);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="Dashboard" element={access_token ? <Main /> : <Navigate to="/login" />}>
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="productdetails/:id" element={<ProductDetails />} />
          <Route path="admin" element={<Admin />} />
          <Route path="addcourse" element={<AddCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
