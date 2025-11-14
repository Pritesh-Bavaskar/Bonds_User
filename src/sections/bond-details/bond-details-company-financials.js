import { useState } from 'react';
import { Container, Box, Typography, useTheme, Tabs, Tab, Paper } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import Chart from 'react-apexcharts';

const companyLogo = '/assets/icons/bond-library/company-img.svg';

// Mock data for different metrics
const financialData = {
  Revenue: [
    { year: '2020', value: 12000 },
    { year: '2021', value: 15000 },
    { year: '2022', value: 18000 },
    { year: '2023', value: 21000 },
    { year: '2024', value: 25000 },
  ],
  PAT: [
    { year: '2020', value: 1500 },
    { year: '2021', value: 1800 },
    { year: '2022', value: 2100 },
    { year: '2023', value: 2400 },
    { year: '2024', value: 2800 },
  ],
  Debt: [
    { year: '2020', value: 8000 },
    { year: '2021', value: 8500 },
    { year: '2022', value: 9000 },
    { year: '2023', value: 9500 },
    { year: '2024', value: 10000 },
  ],
  'Net Worth': [
    { year: '2020', value: 10000 },
    { year: '2021', value: 12000 },
    { year: '2022', value: 14000 },
    { year: '2023', value: 17000 },
    { year: '2024', value: 20000 },
  ],
};

export default function BondDetailsCompanyFinancials() {
  const [activeTab, setActiveTab] = useState('Revenue');
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#00328A'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: [theme.palette.text.primary],
      },
    },
    xaxis: {
      categories: financialData[activeTab].map((item) => item.year),
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical', // can be 'horizontal' or 'vertical'
            shadeIntensity: 0.3,
            gradientToColors: [theme.palette.warning.light], // end color
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 0.6,
            stops: [0, 100],
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: (value) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
          }
          return value;
        },
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
      position: 'back',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  const chartSeries = [
    {
      name: activeTab,
      data: financialData[activeTab].map((item) => item.value),
    },
  ];

  return (
    <Box sx={{ pt: { xs: 6, md: 12 } }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontStyle: 'Bold',
          }}
        >
          Company Financials
        </Typography>
        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 2, mb: 4 }}>
          Detailed financial metrics including Revenue, PAT, Debt, and Net Worth
        </Typography>

        <Paper
          sx={{
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              // height: 400,
              borderRadius: 2,
              // border: `1px solid ${theme.palette.divider}`,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              // sx={{
              //   mb: 3,
              //   '& .MuiTab-root': {
              //     textTransform: 'none',
              //     fontWeight: 600,
              //     minWidth: 'auto',
              //     px: 3,
              //     '&.Mui-selected': {
              //       color: theme.palette.warning.main,
              //     },
              //   },
              //   '& .MuiTabs-indicator': {
              //     backgroundColor: theme.palette.warning.main,
              //   },
              // }}
              sx={{
                mb: 3,
                '& .MuiTabs-flexContainer': {
                  gap: 1, // spacing between tabs
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: 'auto',
                  px: 3,
                  py: 1,
                  border: '1px solid',
                  borderColor: '#000',
                  borderRadius: '50px', // ✅ fully rounded tabs
                  transition: 'all 0.3s ease',
                  color: '#000',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                  '&.Mui-selected': {
                    color: '#fff',
                    borderColor: '#00328A',
                    backgroundColor: '#00328A',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none', // ✅ remove underline indicator
                },
              }}
            >
              {Object.keys(financialData).map((tab) => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>
            <Box sx={{ height: 450, position: 'relative' }}>
              <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
