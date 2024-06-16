import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DevicesIcon from '@mui/icons-material/Devices';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DevicesIcon />
      </ListItemIcon>
      <ListItemText primary="Device Manager" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </>
);