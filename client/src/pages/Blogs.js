import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard.js";
import CreatePostButton from "../components/CreatePostButton.js";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isLogin = useSelector((state) => state.isLogin);
  const userId = useSelector((state) => state.userInfo._id);
  const getBlogs = async () => {
    try {
      const { data } = await axios.get("/blogs/all-blogs");
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            allowEditDelete={userId === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            createdAt={blog.createdAt}
          />
        ))}
      {isLogin && <CreatePostButton />}
    </div>
  );
};

export default Blogs;
