import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    width: '100%'
  },
  textField: {
    display: 'flex',
    flex: 1
  },
  cardContent: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  spacing: {
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2
  },
  inputFile: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  }
});

function TargetUrlCard({ onChange, value, classes, post, postBody }) {
  function openFile(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      const defaultBody = {
        actions: [],
        url: '/no-URL',
        channel: 'default-channel',
        source: 'no-source',
        data: {},
      };
      const messagesToSend = JSON.parse(reader.result)
      post(messagesToSend.map((message, i) => ({
        ...defaultBody,
        ...message,
        id: Date.now() - i,
      })), true);
      input.value = null;
    };
    reader.readAsText(input.files[0]);
  }
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button color="primary" variant="contained" onClick={() => post()} className={classes.spacing}>
          Publish
        </Button>
        <Button color="primary" variant="contained" style={{ position: 'relative' }} className={classes.spacing}>
          Batch Publish
          <input
            type='file'
            accept='.json'
            onChange={openFile}
            className={classes.inputFile}
          />
        </Button>
        <TextField
          id="url"
          label="Target URL"
          className={classes.textField}
          value={value}
          onChange={event => onChange(event.target.value)}
          margin="normal"
        />
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(TargetUrlCard);
