import Typography from '@mui/material/Typography';
import { HIGH_PRIORITY, LOW_PRIORITY, MEDIUM_PRIORITY } from '../services/requestsService';

interface PriorityProps {
    level: string;
}

const Priority: React.FC<PriorityProps> = ({ level }) => {
    let color;
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

    return (
        <Typography component="span" color={color}>
            {level}
        </Typography>
    );
};

export default Priority;