import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setAnchorElUser(null);
    toast.success("Signed out successfully");
    navigate("/login");
  };

  let userID = "123";
  let userImageUrl = "https://cdn-icons-png.flaticon.com/512/1144/1144709.png";
  const user = JSON.parse(localStorage.getItem("user")!);

  if (user) {
    userID = user.id;
    userImageUrl = user.imageUrl;
  }

  return (
    <>
      <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <OndemandVideoIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/" component={RouterLink} color="inherit" underline="none">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                VIDEOAPP
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/" component={RouterLink} color="inherit" underline="none">
                  <MenuItem key="videos" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Videos</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <OndemandVideoIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Link to="/" component={RouterLink} color="inherit" underline="none">
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                VIDEOAPP
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/" component={RouterLink} color="inherit" underline="none">
                <Button
                  key="videos"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Videos
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user icon" src={userImageUrl} />
              </IconButton>
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
                {/* TODO: Repeated validations to quickly bypass a MUI error with React Fragments */}
                {!user && (
                  <Link
                    to="/login"
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign in</Typography>
                    </MenuItem>
                  </Link>
                )}
                {!user && (
                  <Link
                    to="/register"
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign up</Typography>
                    </MenuItem>
                  </Link>
                )}
                {user && (
                  <Link
                    to={`profile/${userID}`}
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <MenuItem key="profile" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                )}
                {user && (
                  <MenuItem key="logout" onClick={logoutUser}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <ToastContainer autoClose={2500} />
    </>
  );
};
export default Layout;
