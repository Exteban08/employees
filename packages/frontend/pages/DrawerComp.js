import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


const DrawerComp = () => {
    return (
        <AppBar>
            <Drawer open={true}>
                <List>
                    <ListItemButton>
                        <ListItemText>Employees</ListItemText>
                    </ListItemButton>
                </List>
            </Drawer>
        </AppBar>
    )
}

export default DrawerComp;