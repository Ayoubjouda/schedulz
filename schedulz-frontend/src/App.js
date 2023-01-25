import Home from "./pages/Home";
import LoginComponent from "./components/login/LoginComponent";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/main/Main";
import MarketPlace from "./pages/main/MarketPlace";
import MyCourses from "./pages/main/MyCourses";
import ProductDetails from "./pages/main/ProductDetails";
import Admin from "./pages/Admin/Admin";
import AddCourse from "./pages/AddCourse/AddCourse";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="Dashboard" element={<Main />}>
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
