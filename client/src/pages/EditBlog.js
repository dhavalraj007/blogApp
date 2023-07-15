import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/Tokens";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    description: "",
  });
  const userId = useSelector((state) => state.userInfo._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/blogs/update-blog/${id}`,
      {
        ...inputs,
        user: userId,
      },
      {
        headers: { Authorization: `Bearer ${await getAccessToken()}` },
      }
    );
    if (data?.success) {
      alert(data.message);
      navigate("/my-blogs");
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await axios.get(`/blogs/blog/${id}`, {
          headers: { Authorization: `Bearer ${await getAccessToken()}` },
        });
        if (data?.success) {
          setInputs({
            title: data.blog.title,
            image: data.blog.image,
            description: data.blog.description,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={10}
          marginTop={10}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h3" color="primary">
            Edit Blog
          </Typography>
          <TextField
            fullWidth
            name="title"
            placeholder="Title"
            margin="normal"
            value={inputs.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="image"
            placeholder="Image"
            margin="normal"
            value={inputs.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="description"
            placeholder="Description"
            multiline
            rows={10}
            margin="normal"
            value={inputs.description}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" size="large">
            Edit Blog
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditBlog;
