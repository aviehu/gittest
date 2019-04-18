import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  card: {
    width: '100%'
  }
});

function MessagesPreviewCard({ messages, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Incoming messages to port 8001
        </Typography>
        <List className={classes.root}>
          {messages.map(({ path, body, id }) => (
            <ListItem alignItems="flex-start" key={id} button>
              <ListItemText primary={path} secondary={JSON.stringify(body)} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(MessagesPreviewCard);
