import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import logo from "../assets/logo.png";

const settings = [
  { name: "Profile", type: "link", path: "/profile" },
  { name: "Dashboard", type: "link", path: "/dashboard" },
  { name: "Rules", type: "link", path: "/rules" },
  { name: "Logout", type: "button" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getRandomColor = () => {
    const colors = ["#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#FF5722"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const { user, logout } = React.useContext(UserContext);

  return (
    <nav className="">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <img
                src={logo}
                alt=""
                style={{
                  width: "110px",
                  height: "35px",
                  marginRight: "50px",
                  display: { xs: "none", md: "flex" },
                }}
              />
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "20px",
                display: { xs: "none", md: "flex" },
              }}
            >
              Home
            </Link>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar
                      alt="Remy Sharp"
                      src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                    /> */}
                    <Avatar
                      sx={{
                        bgcolor: getRandomColor(),
                        fontSize: 25,
                        margin: "auto",
                      }}
                    >
                      {user && user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) =>
                    (setting.name === "Dashboard" && user.role !== "owner") ||
                    (setting.name === "Rules" &&
                      user.role !== "member") ? null : (
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        {setting.type === "link" ? (
                          <Typography textAlign="center">
                            <Link
                              to={setting.path}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {setting.name}
                            </Link>
                          </Typography>
                        ) : (
                          <button
                            onClick={logout}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "black",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {setting.name}
                          </button>
                        )}
                      </MenuItem>
                    )
                  )}
                </Menu>
              </Box>
            ) : (
              <div>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "20px",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "20px",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  Login
                </Link>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}
