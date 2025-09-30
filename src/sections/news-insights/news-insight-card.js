import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function NewsInsightCard({ title, date, subtitle, subtitleBold }) {
  return (
    <Card sx={{ width: '100%', height: 'auto', borderRadius: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="#003289" gutterBottom>
          {date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {subtitle}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            fontFamily: 'Public Sans',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '18.51px',
            letterSpacing: '0px',
            textAlign: 'right',
          }}
        >
          {subtitleBold}
        </Typography>
      </CardContent>
    </Card>
  );
}

NewsInsightCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subtitleBold: PropTypes.string,
};
