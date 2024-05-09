import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextareaAutosize,
} from "@mui/material";

export default function Rules() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/owner/rules_by_tag", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ bgcolor: "rgb(245, 245, 245)", p: 3, minHeight: "100vh" }}>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, margin: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule._id}>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        padding: "8px",
                        border: "1px solid #ccc",
                      }}
                      value={rule.description}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>{rule.tag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Edit Rule Modal */}
        {/* Implement your Edit Rule Modal component here */}
      </Box>
    </div>
  );
}
