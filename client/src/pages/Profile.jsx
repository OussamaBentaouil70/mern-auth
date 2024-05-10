import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import Axios from "axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await Axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } else {
        console.error("Token not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
      // Handle errors here, e.g. by showing an error message
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const getRandomColor = () => {
    const colors = ["#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#FF5722"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <div className="">
      <Box sx={{ bgcolor: "rgb(245, 245, 245)", p: 3, minHeight: "100vh" }}>
        <Card sx={{ maxWidth: 400, margin: "auto" }}>
          <CardContent>
          
            <Typography variant="h5" component="div" gutterBottom>
              User Profile
            </Typography>
            <Avatar
              sx={{
                bgcolor: getRandomColor(),
                width: 56, height: 56,
                fontSize: 32,
                margin: "auto",
              }}
            >
              {userInfo && userInfo.username.charAt(0).toUpperCase()}
            </Avatar>
            {userInfo && (
              <>
                <Typography variant="body1" color="textSecondary">
                  Username: {userInfo.username}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Email: {userInfo.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Role: {userInfo.role}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Fonction: {userInfo.fonction}
                </Typography>
                {/* Add more fields as needed */}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
