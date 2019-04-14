import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  card: {
    width: '100%'
  },
  textField: {
    width: '100%'
  }
});

function PayloadFormCard({ onChange, value, classes }) {
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
        <form>
          <TextField
            id="channel"
            label="channel"
            className={classes.textField}
            value={value.channel}
            onChange={event => onChange({ ...value, channel: event.target.value })}
            margin="normal"
          />
          <TextField
            id="callback"
            label="Callback URL"
            className={classes.textField}
            value={value.url}
            onChange={event => onChange({ ...value, url: event.target.value })}
            margin="normal"
          />
          <TextField
            id="event"
            label="Event"
            className={classes.textField}
            value={value.event}
            onChange={event => onChange({ ...value, event: event.target.value })}
            margin="normal"
          />
          <TextField
            className={classes.textField}
            id="dataString"
            label="Data"
            multiline
            value={dataString}
            onChange={onChangeDataString}
          />
        </form>
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(PayloadFormCard);
