import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard.js";
import { useSelector } from "react-redux";
import CreatePostButton from "../components/CreatePostButton.js";
import { getAccessToken } from "../utils/Tokens.js";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = useSelector((state) => state.userInfo._id);
  const isLogin = useSelector((state) => state.isLogin);
  const getBlogs = async (id) => {
    try {
      const { data } = await axios.get(`/blogs/user-blogs/${id}`, {
        headers: { Authorization: `Bearer ${await getAccessToken()}` },
      });
      console.log(data);
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isLogin) getBlogs(userId);
  }, [isLogin, userId]);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          console.log(blog);
          return (
            <BlogCard
              key={blog._id}
              id={blog._id}
              allowEditDelete={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              createdAt={blog.createdAt}
            />
          );
        })
      ) : (
        <h1>You have not created any</h1>
      )}
      <CreatePostButton />
    </div>
  );
};

export default MyBlogs;
