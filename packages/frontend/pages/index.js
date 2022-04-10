import React from "react";
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


import { gql } from "@apollo/client";
import client from "../configs/apollo-client";

const drawerWidth = 140;
const settings = ['Logout'];


const Header = ({ employees }) => {
  console.log(employees);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
  setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ background: '#063970', zIndex: (theme) => theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar>
          <HomeIcon fontSize='large' />
          <Tabs sx={{ marginLeft: 'auto' }} textColor='primary'>
            {/* Loged in*/}
            <PersonOutlineIcon  />
            <Tab label="User name" onClick={handleOpenUserMenu} />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
            <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" />
          </Box>
          {employees.lenght === 0 && <p>No employees found</p>}
          <List>
            {employees.map(user => (
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

export default Header;
