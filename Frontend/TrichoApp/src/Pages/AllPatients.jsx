import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Popover,
  Checkbox,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Layout } from "../Components/Dashboard/layout.jsx";
import { saveAs } from "file-saver";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Hidden } from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./../config/firebase.js";

export const AllPatients = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [open, setOpen] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const db = getFirestore(app);
        const patientsCollection = collection(db, "patient");
    
        try {
          const querySnapshot = await getDocs(patientsCollection);
          const fetchedPatients = [];
          querySnapshot.forEach((doc) => {
            fetchedPatients.push(doc.data());
          });
          setFetchedData(fetchedPatients);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
    
    
  
    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };
  
    const handleExport = () => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        data.map((row) => Object.values(row).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "patient_data.csv");
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = data.map((n) => n.id);
        setSelected(newSelecteds);
      } else {
        setSelected([]);
      }
    };
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
  
      setSelected(newSelected);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleRowsPerPageChange = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
    };

    const getStatusStyle = (status) => {
        let bgColor, textColor, borderColor;
        switch (status) {
          case "Active":
            bgColor = "rgba(0, 255, 0, 0.1)"; 
            textColor = "green"; 
            borderColor = "green"; 
            break;
          case "Inactive":
            bgColor = "rgba(255, 0, 0, 0.1)"; 
            textColor = "red"; 
            borderColor = "red"; 
            break;
          case "Pending":
            bgColor = "rgba(255, 255, 0, 0.1)";
            textColor = "black";
            borderColor = "rgba(0, 0, 0, 0.5)"; 
            break;
          default:
            bgColor = "transparent"; 
            textColor = "black"; 
            borderColor = "transparent"; 
            break;
        }
        return {
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${borderColor}`,
          padding: "2px 6px", 
          borderRadius: "4px",
          textAlign: "center",
          marginTop: 20,
          marginLeft: 15,
          cursor: "pointer",
          display: "inline-block",
        };
    };
    const filteredData = fetchedData.filter((row) =>
  row.firstName.toLowerCase().includes(filterName.toLowerCase())
);
  
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

     
  
    return (
        <>
        <title>All Patients | Srihtvak</title>
      <Layout>
        <Box component="main" sx={{ flexGrow: 1, py: 1, marginLeft: { xs: 0, lg: 30 }, overflowX: "auto"  }}>
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                <Typography variant="h4">Patients</Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <UpgradeIcon />
                      </SvgIcon>
                    }
                    onClick={handleExport}
                    sx={{
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <AddIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    New User
                  </Button>
                </Stack>
              </Stack>
              <Card sx={{ p: 2 }}>
                <OutlinedInput
                  fullWidth
                  placeholder="Search patient"
                  startAdornment={
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  }
                  sx={{ maxWidth: 500 }}
                  value={filterName}
                  onChange={handleFilterByName}
                />
              </Card>
              <Card>
                <Box sx={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selected.length > 0 && selected.length < filteredData.length
                            }
                            checked={
                              selected.length === filteredData.length && filteredData.length > 0
                            }
                            onChange={handleSelectAllClick}
                            inputProps={{ "aria-label": "select all desserts" }}
                          />
                        </TableCell>
                        <TableCell>Record No</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Study</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            patientRecordNumber,
                            firstName,
                            lastName,
                            email,
                            mobileNumber,
                            city,
                            study,
                            status,
                          } = row;
                          const isSelected = selected.indexOf(patientRecordNumber) !== -1;
                          const statusStyle = getStatusStyle(status);
  
                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, patientRecordNumber)}
                              tabIndex={-1}
                              key={patientRecordNumber}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                              </TableCell>
                              <TableCell>{patientRecordNumber}</TableCell>
                              <TableCell>{firstName}</TableCell>
                              <TableCell>{lastName}</TableCell>
                              <TableCell>{email}</TableCell>
                              <TableCell>{mobileNumber}</TableCell>
                              <TableCell>{city}</TableCell>
                              <TableCell>{study}</TableCell>
                              <TableCell style={statusStyle} >{status}</TableCell>
                              <TableCell>
                                <IconButton
                                  aria-owns={open ? `popover-${patientRecordNumber}` : undefined}
                                  aria-haspopup="true"
                                  onClick={(event) => handleOpenMenu(event, patientRecordNumber)}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={9} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Box>
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Card>
            </Stack>
          </Container>
        </Box>
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => handleCloseMenu()}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu()} style={{ color: "red" }}>
            <ListItemIcon>
              <DeleteIcon style={{ color: "red" }} fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Popover>
      </Layout>
      </>
    );
  };
