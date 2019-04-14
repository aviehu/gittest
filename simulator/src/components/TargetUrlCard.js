import React from 'react';
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

function TargetUrlCard({ onChange, value, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent>
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
