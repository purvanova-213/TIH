import * as React from 'react';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

function ListButton({ icon, title, link }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(link);
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon sx={{ minWidth: "45px" }}>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

export const listItems = (
  <React.Fragment>
    <ListButton icon={<DashboardIcon />} title="Dashboard" link="/dashboard" />

    <ListButton icon={<PeopleIcon />} title="Patients" link="/add-patients" />

    <ListButton icon={<BarChartIcon />} title="Reports" link="/reports" />
  </React.Fragment>
);
