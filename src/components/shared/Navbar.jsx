import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hoocks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileAnchor, setMobileAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const { user, logout } = useAuth();

  /* open & close menus */

  const openMobileMenu = (e) => setMobileAnchor(e.currentTarget); // to keep the anchor position fixed
  const closeMobileMenu = () => setMobileAnchor(null);

  const openUserMenu = (e) => setUserAnchor(e.currentTarget);
  const closeUserMenu = () => setUserAnchor(null);

  const handleLogout = () => {
    closeUserMenu();
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#111",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src="/images/PhysioLink_Logo.png"
            alt="PhysioLink Logo"
            sx={{
              height: { xs: 34, md: 44 }, // rectangular logo
              width: "auto",
              cursor: "pointer",
            }}
          />
        </Box>

        {/*  DESKTOP MENU */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          {user ? (
            <div>
              <IconButton color="inherit" onClick={openUserMenu}>
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={userAnchor}
                open={!!userAnchor}
                onClose={closeUserMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    closeUserMenu();
                    navigate(`${user.role}`);
                  }}
                >
                  Dashboard
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    closeUserMenu();
                    navigate(`${user.role}/edit-profile`);
                  }}
                >
                  Edit Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              sx={{ borderRadius: 2 }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Box>

        {/* MOBILE MENU */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={openMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={mobileAnchor}
          open={!!mobileAnchor}
          onClose={closeMobileMenu}
        >
          <MenuItem
            onClick={() => {
              closeMobileMenu();
              navigate("/");
            }}
          >
            Home
          </MenuItem>

          {user ? (
            <div>
              <MenuItem
                onClick={() => {
                  closeUserMenu();
                  navigate(`${user.role}`);
                }}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => {
                  closeMobileMenu();
                  navigate("/specialist/edit-profile");
                }}
              >
                Edit Profile
              </MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </div>
          ) : (
            <MenuItem
              onClick={() => {
                closeMobileMenu();
                navigate("/login");
              }}
            >
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
