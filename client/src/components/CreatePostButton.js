import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const CreatePostButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      aria-label="add"
      onClick={() => {
        navigate("/create-blog");
      }}
      sx={{
        margin: 0,
        top: "auto",
        right: 45,
        bottom: 40,
        left: "auto",
        position: "fixed",
      }}
    >
      <AddIcon sx={{ marginRight: 1 }} />
      Create Blog
    </Fab>
  );
};

export default CreatePostButton;
