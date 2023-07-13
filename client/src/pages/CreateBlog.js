import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    description: "",
  });
  const userId = useSelector((state) => state.userInfo._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("blogs/create-blog", {
      ...inputs,
      user: userId,
    });
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
            Create Blog
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
            Create Blog
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
