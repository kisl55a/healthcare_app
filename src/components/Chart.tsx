import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, axisClasses } from '@mui/x-charts';

import Title from './Title';
import { Request } from '../services/requestsService';

// Generate Request Data
function createData(time: string, amount: number) {
  return { time, amount };
}

interface ChartProps {
  requests: Request[];
}

export default function Chart({ requests }: ChartProps) {
  const theme = useTheme();

  const dateCounts = requests.reduce((counts, request) => {
    const date = new Date(request.date);
    const day = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;

    if (!counts[day]) {
      counts[day] = 0;
    }
    counts[day]++;
    return counts;
  }, {} as Record<string, number>);

  const data = Object.entries(dateCounts).map(([date, count]) => {
    return createData(date, count);
  });

  return (
    <React.Fragment>
      <Title>Requests by Date</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <BarChart
          dataset={data}
          margin={{
            top: 16,
            right: 50,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'band', // Change this from 'point' to 'band'
              dataKey: 'time',
              tickNumber: 2,
            },
          ]}
          yAxis={[
            {
              label: 'Number of Requests',
              max: 10,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}