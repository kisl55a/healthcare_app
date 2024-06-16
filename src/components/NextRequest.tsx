import * as React from 'react';

import { Request } from '../services/requestsService';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Title from './Title';
import Priority from './Priority';

interface NextRequestProps {
  latestRequest: Request;
  onOpenRequestModal: (request: Request) => void;
}

export default function NextRequest({ latestRequest, onOpenRequestModal }: NextRequestProps) {
  const handleOpenRequestModal = () => {
    onOpenRequestModal(latestRequest);
  };

  return (
    <React.Fragment>
      <Title>Next request to handle</Title>
      {latestRequest ? (
        <>
          <Typography component="p" variant="h4">
            #{latestRequest.id}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on {new Date(latestRequest.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Typography>
          <Typography color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: '0.8rem',
            mb: 1,
            mt: 1
          }}>
            {latestRequest.description}
          </Typography>
          <Typography>Priority: <Priority level={latestRequest.urgency} /> </Typography>
          <div>
            <Link color="primary" href="#" onClick={handleOpenRequestModal}>
              View request
            </Link>
          </div>
        </>
      ) : (
        <Typography>No unhandled requests</Typography>
      )}
    </React.Fragment>
  );
}