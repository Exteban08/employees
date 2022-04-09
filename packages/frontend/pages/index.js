import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


import { gql } from "@apollo/client";
import client from "../configs/apollo-client";

const drawerWidth = 240;

const Header = ({ users }) => {
  console.log(users);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ background: '#063970', zIndex: (theme) => theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar>
          <HomeIcon fontSize='large'/>
          <Tabs sx={{ marginLeft: 'auto' }} textColor='primary'>
            {/* Loged in
            <PersonOutlineIcon /> 
              {/*<Tab label="User name" />*/}
          </Tabs>
          {/* Loged out */}
          <Button sx={{ marginLeft: 'auto' }}
            >Login
          </Button>
          <Button sx={{ marginLeft: '10px' }}
            >Register
          </Button>
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
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Box>
          <List>
            {users.map(user => (
              <ListItem style={{ display: 'flex', flexDirection: 'column'}} key={user.id}>
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.lastName}</div>
                <div>{user.email}</div>
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
      query Users {
        users {
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
      users: data.users,
    },
  };
}

export default Header;