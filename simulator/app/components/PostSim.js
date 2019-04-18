import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TargetUrlCard from './TargetUrlCard';
import PayloadDataPreview from './PayloadDataPreview';
import PayloadFormCard from './PayloadFormCard';
import MessagesPreviewCard from './MessagesPreviewCard';
import publishToServer from '../api/publish';
import AppBar from './AppBar';
import getNewIncomingMessages from '../api/getNewIncomingMessages';
import backupUrl from '../localStorage/backupUrl';
import backupPayload from '../localStorage/backupPayload';
import readUrl from '../localStorage/readUrl';
import readPayload from '../localStorage/readPayload';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    width: '100%'
  },
  jsonField: {},
  grid: {
    paddingTop: theme.spacing.unit * 10
  }
});

function PostSim({ classes }) {
  const [url, setUrl] = useState(readUrl());
  const [payload, setPayload] = useState(readPayload());
  const [messages, setMessages] = useState([]);

  function changePayload(newPayload) {
    backupPayload(newPayload);
    setPayload(newPayload);
  }
  function changeUrl(newUrl) {
    backupUrl(newUrl);
    setUrl(newUrl);
  }

  function post() {
    return publishToServer(url, payload);
  }

  useEffect(() => {
    const allMessages = [];
    function appendToAllMessages(newMessage) {
      allMessages.push({
        id: allMessages.length,
        ...newMessage
      });
    }
    getNewIncomingMessages(newMessages => {
      newMessages.forEach(appendToAllMessages);
      setMessages([].concat(allMessages));
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container spacing={16} className={classes.grid}>
        <Grid item xs={12}>
          <TargetUrlCard post={post} value={url} onChange={changeUrl} />
        </Grid>
        <Grid item xs={6}>
          <PayloadFormCard value={payload} onChange={changePayload} />
        </Grid>
        <Grid item xs={6}>
          <PayloadDataPreview value={payload} />
        </Grid>
        <Grid item xs={12}>
          <MessagesPreviewCard messages={messages} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PostSim);
