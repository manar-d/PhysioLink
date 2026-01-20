import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

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

import useAuth from "../../hooks/useAuth";
import LanguageMenu from "./LanguageMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { user, logout } = useAuth();

  const [mobileAnchor, setMobileAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

  //open & close menus (handlers)
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
        {/* Logo */}
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
            alt={t("Navbar.logoAlt")}
            sx={{
              height: { xs: 34, md: 44 }, // rectangular logo
              width: "auto",
              cursor: "pointer",
            }}
          />
        </Box>

        {/* Desktop menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <LanguageMenu />

          <Button color="inherit" onClick={() => navigate("/")}>
            {t("Navbar.home")}
          </Button>

          {user ? (
            <div>
              <IconButton color="inherit" onClick={openUserMenu}>
                <AccountCircle sx={{ color: "#9e9e9e" }} />
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
                  {t("Navbar.dashboard")}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    closeUserMenu();
                    navigate(`/reset-password`);
                  }}
                >
                  {t("ResetPassword.title")}
                </MenuItem>

                <MenuItem onClick={handleLogout}>{t("Navbar.logout")}</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              sx={{ borderRadius: 2 }}
              onClick={() => navigate("/login")}
            >
              {t("Navbar.login")}
            </Button>
          )}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={openMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile menu */}
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
            {t("Navbar.home")}
          </MenuItem>

          {user ? (
            <div>
              <MenuItem
                onClick={() => {
                  closeMobileMenu();
                  navigate(`${user.role}`);
                }}
              >
                {t("Navbar.dashboard")}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  closeMobileMenu();
                  navigate(`/reset-password`);
                }}
              >
                {t("ResetPassword.title")}
              </MenuItem>

              <MenuItem onClick={handleLogout}>{t("Navbar.logout")}</MenuItem>
            </div>
          ) : (
            <MenuItem
              onClick={() => {
                closeMobileMenu();
                navigate("/login");
              }}
            >
              {t("Navbar.login")}
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}