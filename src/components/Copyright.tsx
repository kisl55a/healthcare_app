import Typography, { TypographyProps } from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props: TypographyProps<'span', { component?: 'span' }>) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.linkedin.com/in/dmitriikislenko/">
          Dmitrii Kislenko
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright;