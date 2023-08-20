import React from "react";
import { SvgIcon } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const items = [
  {
    title: "Overview",
    path: "/all-patient",
    icon: (
      <SvgIcon fontSize="small">
        <GroupAddIcon />
      </SvgIcon>
    ),
  },
  {
    title: "New User",
    path: "/patient",
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircleIcon />
      </SvgIcon>
    ),
  },
];
