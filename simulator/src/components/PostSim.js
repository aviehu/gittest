import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TargetUrlCard from './TargetUrlCard';
import PayloadDataPreview from './PayloadDataPreview';
import PayloadFormCard from './PayloadFormCard';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    width: '100%'
  },
  jsonField: {}
});

function PostSim({ classes }) {
  const [url, setUrl] = useState('/publish');

  const [payload, setPayload] = useState({
    channel: 'channel',
    url: '/callback',
    event: 'change',
    data: { value: 100 },
    actions: ['change']
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TargetUrlCard value={url} onChange={setUrl} />
        </Grid>
        <Grid item xs={6}>
          <PayloadFormCard value={payload} onChange={setPayload} />
        </Grid>
        <Grid item xs={6}>
            <PayloadDataPreview value={payload.data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PostSim);
