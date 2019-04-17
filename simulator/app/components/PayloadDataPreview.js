import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import ReactJson from 'react-json-view';

const styles = () => ({
  card: {
    width: '100%',
    backgroundColor: 'rgb(39, 40, 34)'
  },
  textField: {
    width: '100%'
  }
});

function PayloadDataPreview({ value, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <ReactJson src={value} theme="monokai" />
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(PayloadDataPreview);
