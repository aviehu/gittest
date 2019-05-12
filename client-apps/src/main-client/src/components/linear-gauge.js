import React from 'react';
import MaterialLinearGauge from '@material-ui/core/LinearProgress';
import useChannel from '../hooks/use-channel';

export default function LinearGauge(props) {
  const {
    value: defaultValue,
    min,
    max,
    ...materialProps
  } = props;
  const { value } = useChannel(props);
  const usedValue = value === null || value === undefined ? defaultValue : value;
  // Calculate the position of the value within a max and min
  const percentage = (usedValue - min) / (max - min) * 100;

  return <MaterialLinearGauge {...materialProps} {...data} value={percentage} variant="determinate" />;
}
