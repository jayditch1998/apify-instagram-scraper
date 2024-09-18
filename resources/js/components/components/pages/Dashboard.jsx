import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "50%",
    margin: "19px auto",
    backgroundColor: "#E6F4F1",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnStyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={logoStyle}>
          <DashboardIcon
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <Typography variant="h4" style={{ color: "#002A57" }}>
          Dashboard
        </Typography>
      </Grid>

      <Paper elevation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <DashboardIcon style={{ color: "#002A57" }} />
          </Avatar>
          <Typography variant="h5" style={{ color: "#002A57" }}>
            Welcome to Your Dashboard
          </Typography>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Button
            style={btnStyle}
            color="primary"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Dashboard;
