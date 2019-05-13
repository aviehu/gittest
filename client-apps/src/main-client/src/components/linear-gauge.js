import React from 'react';
import MaterialLinearGauge from '@material-ui/core/LinearProgress';
import useChannel from '../hooks/use-channel';

export default function LinearGauge(props) {
  const {
    min,
    max,
    ...materialProps
  } = props;
  const { value } = useChannel(props);
  // Calculate the position of the value within a max and min
  const percentage = (value - min) / (max - min) * 100;

  return <MaterialLinearGauge {...materialProps} {...data} value={percentage} variant="determinate" />;
}
