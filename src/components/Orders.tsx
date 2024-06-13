import * as React from 'react';
import { useState } from 'react';
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

// Generate Request Data
function createData(
    id: number,
    date: string,
    caseId: string,
    description: string,
    urgency: string,
    status: string,
) {
    return { id, date, caseId, description, urgency, status };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Case 001',
        'This is a description of the case. It is quite long but should not overflow the column.',
        'High',
        'completed',
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Case 002',
        'This is a description of the case. It is quite long but should not overflow the column.',
        'High',
        'pending',
    ),
    createData(
        2,
        '16 Mar, 2019',
        'Case 003',
        'This is a description of the case. It is quite long but should not overflow the column.',
        'High',
        'pending',
    ),
    createData(
        3,
        '16 Mar, 2019',
        'Case 004',
        'This is a description of the case. It is quite long but should not overflow the column.',
        'High',
        'pending',
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Requests() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openedMenu, setOpenedMenu] = useState<number | null>(null); // Add this line

    const handleClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenedMenu(id); // Set the id of the clicked menu
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenedMenu(null); // Reset when menu is closed
    };

    return (
        <React.Fragment>
            <Title>Recent Cases</Title>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Case ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Urgency</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
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
                                        <MenuItem onClick={handleClose}>Respond</MenuItem>
                                        <MenuItem onClick={handleClose}>Report to emergency</MenuItem>
                                        <MenuItem onClick={handleClose}>Close the issue</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more cases
            </Link>
        </React.Fragment>
    );
}