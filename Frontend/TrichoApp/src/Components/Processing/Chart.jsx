import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import Box from '@mui/material/Box';
import ApexCharts from 'apexcharts';


const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

export const Charts = ({ isLoading, ChartData }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();


  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
       ...ChartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // Do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [isLoading, primary200, primaryDark, secondaryMain, secondaryLight, primary, grey200, grey500]);

  return (
    <>
     <Box sx={{maxWidth: 600, margin: '0 auto', padding: '1rem', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Total Growth</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3">Hair Length</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart {...ChartData} />
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

Charts.propTypes = {
  isLoading: PropTypes.bool,
  ChartData: PropTypes.object.isRequired,
};
