import React from 'react';
import MaterialLinearGauge from '@material-ui/core/LinearProgress';
import useChannel from '../hooks/use-channel';

export default function LinearGauge(props) {
  const { min, max, value, ...materialProps } = props;
  const { channelValue } = useChannel(props);
  const val = channelValue || value;
  // Calculate the position of the value within a max and min
  const percentage = !Number.isNaN(val) && val ? ((Number(val) - min) / (max - min)) * 100 : 0;
  return <MaterialLinearGauge {...materialProps} value={percentage} variant="determinate" />;
}
