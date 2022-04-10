import React, { useEffect } from "react";
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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


import { gql, useLazyQuery } from "@apollo/client";
import client from "../configs/apollo-client";

import debounce from 'lodash.debounce';

const drawerWidth = 140;
const settings = ['Logout'];


const Home = ({ employees }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const router = useRouter();
  const user = cookies['user'];

  const [searchEmployees, { loading, error, data }] = useLazyQuery(SEARCH_EMPLOYEES);
  const [searchText, setSearchText] = React.useState('');

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

  const renderEmployees = Boolean(searchText) ? (data?.searchEmployees || []) : employees;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ background: '#063970', zIndex: (theme) => theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar>
          <HomeIcon fontSize='large' />
          <Tabs sx={{ marginLeft: 'auto' }} textColor='primary'>
            {/* Loged in*/}
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
          {/* Loged out
          <Button sx={{ marginLeft: 'auto' }}
            >Login
          </Button>
          <Button sx={{ marginLeft: '10px' }}
            >Register
          </Button>*/}
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
          <List>
            {renderEmployees.map(user => (
              <ListItem
              style={{ display: 'flex', flexDirection: 'column'}}
              alignItems="center"
              key={user.id}
              >
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.lastName}</div>
                <div>{user.email}</div>
                <div>{user.nationality}</div>
                <div>{user.phone}</div>
                <div>{user.civilStatus}</div>
                <div>{user.birthday}</div>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      employees: data.employees,
    },
  };
}

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
