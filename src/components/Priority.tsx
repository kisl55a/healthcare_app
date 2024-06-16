import Typography from '@mui/material/Typography';
import { COMPLETED_STATUS, HIGH_PRIORITY, LOW_PRIORITY, MEDIUM_PRIORITY } from '../services/requestsService';

interface PriorityProps {
    level: string;
    status?: string;
}

const Priority: React.FC<PriorityProps> = ({ level, status }) => {
    let color;
    if (status === COMPLETED_STATUS) {
        color = 'black';
    } else {
        switch (level) {
            case HIGH_PRIORITY:
                color = 'red';
                break;
            case MEDIUM_PRIORITY:
                color = 'black';
                break;
            case LOW_PRIORITY:
                color = 'green';
                break;
            default:
                color = 'black';
        }
    }

    return (
        <Typography component="span" color={color}>
            {level}
        </Typography>
    );
};

export default Priority;