import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  card: {
    width: '100%'
  },
  tableContainer: {
    overflow: 'auto'
  }
});

function IncomingMessagesPreviewCard({ messages, classes }) {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>Body</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {messages.reverse().map(({ url, body, timestamp }) => (
          <TableRow key={body.id}>
            <TableCell>
              <Typography>
                {new Date(timestamp).toLocaleString('default', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </Typography>
            </TableCell>
            <TableCell>{url}</TableCell>
            <TableCell>{JSON.stringify(body)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default withStyles(styles)(IncomingMessagesPreviewCard);
