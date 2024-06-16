import { useState } from 'react';

import { COMPLETED_STATUS, Request } from '../services/requestsService';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';

import Textarea from './styled-components/Textarea';
import Priority from './Priority';

interface Props {
  open: boolean;
  onClose: () => void;
  request?: Request;
  onSubmit: (reply: string) => Promise<void>;
}

const RequestModal = ({ open, onClose, request, onSubmit }: Props) => {
  const [reply, setReply] = useState(request?.reply || '');
  const [loading, setLoading] = useState(false);
  const isRequestEditable = request?.status !== COMPLETED_STATUS;

  const handleReplyChange = (event: any) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = async () => {
    setLoading(true);
    await onSubmit(reply);
    setLoading(false);
    setReply('');
  };

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{isRequestEditable ? 'Reply to Request' : 'View the request'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Device ID:</strong> {request?.caseId}
          </DialogContentText>
          <DialogContentText>
            <strong>Description:</strong> {request?.description}
          </DialogContentText>
          <DialogContentText>
            <strong>Urgency:</strong>{request?.urgency ? <Priority level={request.urgency} /> : null}
          </DialogContentText>
          <Textarea
            autoFocus
            id="reply"
            required
            style={{ width: '100%', padding: '6px 12px' }}
            minRows={4}
            value={reply}
            onChange={handleReplyChange}
            disabled={!isRequestEditable}
          />
          {reply.length === 0 && <FormHelperText error>Reply is required.</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {isRequestEditable && (
            <Button onClick={handleReplySubmit} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
  );
};

export default RequestModal;