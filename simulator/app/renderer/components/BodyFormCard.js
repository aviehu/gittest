import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import MultiTextField from './MultiTextField';

const styles = theme => ({
  card: {
    width: '100%'
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2
  }
});

function BodyFormCard({ onChange, value, classes }) {
  const [dataString, setDataString] = useState(JSON.stringify(value.data, null, 2));
  function onChangeDataString(event) {
    setDataString(event.target.value);
    try {
      onChange({ ...value, data: JSON.parse(event.target.value) });
    } catch (error) {}
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography >
            Accumulate
          </Typography>
          <Switch
            checked={value.accumulate}
            onChange={() => onChange({ ...value, accumulate: !value.accumulate })}
          />
        </div>
        <TextField
          label="channel"
          className={classes.textField}
          value={value.channel}
          onChange={event => onChange({ ...value, channel: event.target.value })}
        />
        <TextField
          label="Callback URL"
          className={classes.textField}
          value={value.url}
          onChange={event => onChange({ ...value, url: event.target.value })}
        />
        <TextField
          label="Event"
          className={classes.textField}
          value={value.event}
          onChange={event => onChange({ ...value, event: event.target.value })}
        />
        <MultiTextField
          label="Actions"
          className={classes.textField}
          value={value.actions}
          onChange={actions => onChange({ ...value, actions })}
        />
        <TextField
          label="Source"
          className={classes.textField}
          value={value.source}
          onChange={event => onChange({ ...value, source: event.target.value })}
        />
        <TextField
          className={classes.textField}
          label="Data"
          multiline
          value={dataString}
          onChange={onChangeDataString}
        />
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(BodyFormCard);
