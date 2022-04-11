import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';


import { gql, useLazyQuery, useQuery } from "@apollo/client";
import client from "../configs/apollo-client";

import debounce from 'lodash.debounce';
import EmployeeModal from "../components/EmployeeModal";

const drawerWidth = 140;
const settings = ['Logout'];


const Home = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const router = useRouter();
  const user = cookies['user'];

  const { data, refetch: refetchEmployees } = useQuery(GET_EMPLOYEES);
  const employees = data?.employees || [];
  const [searchEmployees, { data: searchEmployeesData }] = useLazyQuery(SEARCH_EMPLOYEES);
  const [searchText, setSearchText] = React.useState('');

  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const debounceSearch = debounce(() => {
    searchEmployees({ variables: { textSearch: searchText } });
  }, 1000);

  useEffect(() => {
    debounceSearch();
  }, [searchText]);

  const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (buttonId) => () => {
    setAnchorElUser(null);

    if (buttonId === 'Logout') {
      removeCookie('user');
      router.push('/login');
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEmployeeClick = (employee) => () => {
    setSelectedEmployee(employee);
    setOpenEmployeeModal(true);
  }

  const onEmployeeModalClose = () => {
    setSelectedEmployee(null);
    setOpenEmployeeModal(false);
  }

  const renderEmployees = Boolean(searchText) ? (searchEmployeesData?.searchEmployees || []) : employees;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ background: '#063970', zIndex: (theme) => theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar>
          <HomeIcon fontSize='large' />
          <Tabs sx={{ marginLeft: 'auto' }} value={false}>
          <PersonOutlineIcon  />
            <Tab label={user?.username || ''} onClick={handleOpenUserMenu} />
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Tabs>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column' }} p={2}>
          <Button variant="primary">Employees</Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box p={2}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Search"
              value={searchText}
              variant="outlined"
              placeholder="Search"
              fullWidth
              onChange={handleSearchTextChange}
            />
          </Box>
          {employees.lenght === 0 && <p>No employees found</p>}

          <List>
            {renderEmployees.map(employee => (
                <ListItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  alignItems="center"
                  key={employee.id}
                >
                  <ListItemText
                    sx={{ width: '100%' }}
                    key={employee.id}
                    primary={
                      <React.Fragment>
                        <Typography gutterBottom variant="h5">
                        {employee.name}
                        {" "}
                        {employee.lastName}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                            <div>{employee.email}</div>
                            <div>{employee.nationality}</div>
                            <div>{employee.phone}</div>
                            <div>{employee.civilStatus}</div>
                            <div>{new Date(employee.birthday).toLocaleString()}</div>
                            <Button variant="contained" onClick={handleEmployeeClick(employee)}>
                              Info
                            </ Button>
                          </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <EmployeeModal
        open={openEmployeeModal}
        onClose={onEmployeeModalClose}
        employee={selectedEmployee}
        refetchEmployees={refetchEmployees}
      />
    </Box>
  )
}

const GET_EMPLOYEES = gql`
  query Employees {
    employees {
      id
      email
      name
      lastName
      nationality
      phone
      birthday
      civilStatus
    }
  }
`;

const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($textSearch: String!) {
    searchEmployees(textSearch: $textSearch) {
      id
      email
      name
      lastName
      nationality
      phone
      civilStatus
    }
  }
`;

export default Home;
