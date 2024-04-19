import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import userAuthStore from "../../store/userAuthStore/userAuthStore";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ButtonAppBar() {
  const user = userAuthStore((state) => state.user);
  const logout = userAuthStore((state) => state.logout);
  const navigate = useNavigate();

  let menuItems = [];
  if (user === "Employer") {
    menuItems = [
      { text: "Job Posts", route: "/job-posts" },
      { text: "Assessments", route: "/assessments" },
      { text: "Create Assessment", route: "/create-assessment" },
    ];
  } else if (user === "JobSeeker") {
    menuItems = [
      { text: "Search Jobs", route: "/search-jobs" },
      { text: "Saved Jobs", route: "/saved-jobs" },
      { text: "Applied Jobs", route: "/applied-jobs" },
    ];
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div>
            {menuItems.map((menuItem, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={menuItem.route}
              >
                {menuItem.text}
              </Button>
            ))}
            <Button color="inherit" onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
