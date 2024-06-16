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
import { NotificationProvider } from './contexts/NotificationContext';

const defaultTheme = createTheme();

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleDrawer = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <NotificationProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Topbar open={isSidebarOpen} toggleDrawer={toggleDrawer} />
          <SideBar open={isSidebarOpen} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              minHeight: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/home" Component={DashboardPage} />
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </Container>
            <Box
              sx={{
                mt: 'auto',
                padding: (theme) => theme.spacing(2),
              }}
            >
               <Copyright sx={{ pt: 4 }} />
            </Box>
          </Box>
        </Box>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
