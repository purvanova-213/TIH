import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AccountPopover } from "./account-popover.jsx";
import { useNavigate } from "react-router-dom";
import DocImage from "../../assets/Images/docImg.jpg";
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7"; 
import MenuIcon from "@mui/icons-material/Menu";

const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    const newTheme = theme.palette.mode === "dark" ? "light" : "dark";
    theme.palette.mode = newTheme;
  };

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <IconButton onClick={onNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          {/* Display Date and Time */}
          <Typography
            sx={{
              display: "flex",
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography
            style={{
              display: "flex",
              fontSize: "1rem",
              fontWeight: "bold",
              color: theme.palette.info.main,
            }}
          >
            {currentTime.toLocaleTimeString("en-US", { hour12: false })}
          </Typography>
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={toggleDarkMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton onClick={handleAccountClick}>
              <Avatar
                src={DocImage}
                alt="Doctor's Image"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <AccountPopover
        anchorEl={anchorEl}
        onClose={handleAccountClose}
        open={Boolean(anchorEl)}
        navigate={navigate}
      />
    </Box>
  );
};
