import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { decodeToken } from "react-jwt";
import { setAccessToken, setRefreshToken } from "../utils/Tokens";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        const decoded = decodeToken(data.access_token);
        if (!decoded) {
          console.log("token not valid!");
          return;
        }

        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        dispatch(authActions.login());
        dispatch(authActions.storeUserInfo(decoded));
        alert("user login succefully");
        navigate("/");
      } else {
        alert(data.message);
        console.log("fail");
      }
    } catch (error) {
      alert(error.response.data.message);
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
            Login
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            sx={{ width: 350 }}
            required
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            value={inputs.password}
            onChange={handleChange}
            sx={{ width: 350 }}
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
              navigate("/register");
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
