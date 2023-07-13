import Header from "./components/Header.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import MyBlogs from "./pages/MyBlogs.js";
import CreateBlog from "./pages/CreateBlog.js";
import { useSelector } from "react-redux";
import EditBlog from "./pages/EditBlog.js";
function App() {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/my-blogs"
          element={isLogin ? <MyBlogs /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-blog"
          element={isLogin ? <CreateBlog /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-blog/:id"
          element={isLogin ? <EditBlog /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
