import { useState } from 'react';

import { COMPLETED_STATUS, type Request } from '../services/requestsService';
import { useRequests } from '../hooks/useRequests';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Loader from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'; // import Box

import Chart from '../components/Chart';
import NextRequestCard from '../components/NextRequest';
import RequestsTable from '../components/RequestsTable';
import RequestModal from '../components/RequestModal';
import { useNotification } from '../contexts/NotificationContext';


export default function Dashboard() {
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request>();
  const { requestsQuery, updateRequestMutation, deleteRequestMutation } = useRequests();
  const { data: requestsData = [], isLoading } = requestsQuery;
  const notificationContext = useNotification();
  const latestRequest = requestsData.filter(request => request.status !== COMPLETED_STATUS).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const handleOpenRequestModal = (request: Request) => {
    setSelectedRequest(request);
    setOpenReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setOpenReplyModal(false);
  }

  const handleReplySubmit = async (reply: string) => {
    if (!selectedRequest) return;
    await updateRequestMutation.mutateAsync({ ...selectedRequest, reply });
    setOpenReplyModal(false);
    notificationContext.showNotification('Request updated successfully', 'success');
  }

  const handleRemoveRequest = async (request: Request) => {
    await deleteRequestMutation.mutateAsync(request.id);
    notificationContext.showNotification('Request removed successfully', 'success');
  }

  if (isLoading) {
    return <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="75vh"
    >
      <Loader />
    </Box>

  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart requests={requestsData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <NextRequestCard latestRequest={latestRequest} onOpenRequestModal={handleOpenRequestModal} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <RequestsTable onOpenRequestModal={handleOpenRequestModal} onRemoveRequest={handleRemoveRequest} requests={requestsData} />
          </Paper>
        </Grid>
      </Grid>
      <RequestModal key={selectedRequest?.id} open={openReplyModal} request={selectedRequest} onClose={handleCloseReplyModal} onSubmit={handleReplySubmit} />
    </>
  );
}