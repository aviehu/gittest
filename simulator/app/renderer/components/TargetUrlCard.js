import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  card: {
    width: '100%'
  },
  textField: {
    display: 'flex',
    flex: 1,
    marginLeft: 20
  },
  cardContent: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }
});

function TargetUrlCard({ onChange, value, classes, post }) {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button color="primary" variant="contained" onClick={post}>
          Publish
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
