import React, { useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MoreMenu = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClose = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/blogs/delete-blog/${id}`);
      if (data?.success) {
        alert(data.message);
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <IconButton
        ref={ref}
        aria-label="settings"
        onClick={() => {
          setOpen((prevOpen) => !prevOpen);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={ref.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem
                    onClick={() => {
                      navigate(`/edit-blog/${id}`);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default MoreMenu;
