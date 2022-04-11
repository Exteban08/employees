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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


<<<<<<< Updated upstream
import { gql, useLazyQuery, useQuery } from "@apollo/client";
=======

import { gql, useLazyQuery } from "@apollo/client";
>>>>>>> Stashed changes
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
          <Tabs sx={{ marginLeft: 'auto' }} textColor='primary'>
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
              fullWidth
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </Box>
          {employees.lenght === 0 && <p>No employees found</p>}
          <Card sx={{ maxWidth: 345, backgroundColor: 'gray' }}>
            {renderEmployees.map(user => (
              <CardContent key={user.id}>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  {user.lastName}
                  {" "}
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  <div>{user.email}</div>
                  <div>{user.nationality}</div>
                  <div>{user.phone}</div>
                  <div>{user.civilStatus}</div>
                  <div>{user.birthday}</div>
                </Typography>
              </CardContent>
            ))}
          </Card>
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
