import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

function EditMemberModal({ open, handleClose, member }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fonction: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await Axios.get(`/owner/members/${member._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { username, email, fonction } = response.data;
        setFormData({ username, email, fonction });
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    if (open) {
      fetchMember();
    }
  }, [open, member?._id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await Axios.put(`/owner/members/${member._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Member updated successfully!");
      handleClose(); // Close modal on successful submission
      window.location.reload(); // Refresh the page after editing member
    } catch (error) {
      console.error("Error updating member:", error);
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
            Edit Member
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
            value={formData.username}
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Function"
            name="fonction"
            value={formData.fonction}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Member
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditMemberModal;
