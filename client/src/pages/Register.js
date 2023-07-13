import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      console.log(data);
      if (data.success) {
        alert("user registered succefully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={10}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textTransform={"uppercase"}>
            Register
          </Typography>
          <TextField
            placeholder="Name"
            name="name"
            margin="normal"
            type="text"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registered? Please Login!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
