import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Axios from "axios";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
function CreateMemberModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fonction: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    try {
      const response = await Axios.get("/owner/members", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
        },
      });
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle errors here, e.g. by showing an error message
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      await Axios.post("/owner/members", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Member added successfully!");
      handleClose(); // Close modal on successful submission
      window.location.href = "/dashboard"; // Refresh the page to see the new member
    } catch (error) {
      console.error("Error creating member:", error);
      toast.error(
        error.response.data.error || "An error occurred. Please try again. "
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Create New Member
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Function"
            name="fonction"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Member
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateMemberModal;
