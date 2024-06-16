import { useState } from 'react';

import { COMPLETED_STATUS, Request } from '../services/requestsService';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface RequestsProps {
    requests: Request[];
    onOpenRequestModal: (request: Request) => void;
    onRemoveRequest: (request: Request) => void;
}

export default function Requests({ requests, onOpenRequestModal, onRemoveRequest }: RequestsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openedMenu, setOpenedMenu] = useState<number | null>(null);
    const sortedRequests = [...requests].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenedMenu(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenedMenu(null);
    };

    const handleRemoveRequest = () => {
        onRemoveRequest(requests.find(request => request.id === openedMenu)!);
        handleClose();
    }

    const handleOpenRequestModal = () => {
        onOpenRequestModal(requests.find(request => request.id === openedMenu)!);
        handleClose();
    }

    return (
        <>
            <Title>Requests</Title>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Device ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRequests.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.caseId}</TableCell>
                                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</TableCell>
                                <TableCell>{row.urgency}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick(row.id)} // Pass the id to the handleClick function
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        open={openedMenu === row.id} // Only open the menu if the id matches
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleOpenRequestModal}>{row.status !== COMPLETED_STATUS ? 'Respond' : 'View request'}</MenuItem>
                                        <MenuItem onClick={handleRemoveRequest}>Close the issue</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link color="primary" href="#" sx={{ mt: 3 }}>
                See more cases
            </Link>
        </>
    );
}