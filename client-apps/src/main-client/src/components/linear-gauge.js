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
  const { data } = useChannel(props);
  const { value } = data || {};
  const usedValue = value === null || value === undefined ? defaultValue : value;
  const percentage = (usedValue - min) / (max - min) * 100;

  return <MaterialLinearGauge {...materialProps} {...data} value={percentage} variant="determinate" />;
}
