import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Box, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateMemberModal from "../components/CreateMemberModal";
import EditMemberModal from "../components/EditMemberModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setOpenEditModal(true);
  };

  useEffect(() => {
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

    fetchData();
  }, []);
  const handleDelete = (member) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      // Call the delete API endpoint
      Axios.delete(`/owner/members/${member._id}`)
        .then(() => {
          toast.success("Member deleted successfully!");
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.error("Error deleting member:", error);
        });
    }
  };

  return (
    <div className="">
      <Box sx={{ bgcolor: "rgb(245, 245, 245)", p: 3, minHeight: "100vh" }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Create New Member
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, margin: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Function</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member._id}>
                  <TableCell component="th" scope="row">
                    {member.username}
                  </TableCell>
                  <TableCell align="right">{member.email}</TableCell>
                  <TableCell align="right">{member.role}</TableCell>
                  <TableCell align="right">{member.fonction}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(member)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(member)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CreateMemberModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
        {/* Edit Member Modal */}
        <EditMemberModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          member={selectedMember}
        />
      </Box>
    </div>
  );
}
