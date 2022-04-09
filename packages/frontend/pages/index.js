import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DrawerComp from "./DrawerComp";



const Header = () => {
  return (
    <AppBar sx={{ background: '#063970' }}>
      <Toolbar>
        <HomeIcon fontSize='large'/>
        <Tabs sx={{ marginLeft: 'auto' }} textColor='white'>
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
      <DrawerComp />
    </AppBar>
  )
}

export default Header;