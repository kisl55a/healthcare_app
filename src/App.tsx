import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';


import DashboardPage from './pages/DashboardPage';

import Topbar from './components/TopBar';
import SideBar from './components/Sidebar';
import Copyright from './components/Copyright';

const defaultTheme = createTheme();

const App: React.FC = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Topbar open={open} toggleDrawer={toggleDrawer} />
          <SideBar open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/home" Component={DashboardPage} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
            </Container>
            <Copyright sx={{ pt: 4 }} />
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
