import React from 'react';
import Typography from '@material-ui/core/Typography';
import useChannel from '../hooks/use-channel';

function buildStyle(kind) {
  switch (kind) {
    case 'title': {
      return { variant: 'h5', component: 'h2', gutterBottom: true };
    }
    case 'secondary': {
      return { color: 'textSecondary' };
    }
    default: {
      return {};
    }
  }
}

export default function Label(props) {
  const { children, render, kind } = props;
  const { data, actions } = useChannel(props);

  return <Typography {...buildStyle(kind)} {...props}>{render ? render({ data, actions }) : children}</Typography>;
}
