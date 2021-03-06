import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import TargetUrlCard from '../TargetUrlCard';
import BodyDataPreview from '../BodyDataPreview';
import { backupOutgoingMessageHistory } from '../../localStorage/outgoingMessageHistory';
import BodyFormCard from '../BodyFormCard';
import publishToServer from '../../api/publish';
import AppBar from '../AppBar';
import backupUrl from '../../localStorage/backupUrl';
import backupBody from '../../localStorage/backupBody';
import { backupIncomingMessageHistory } from '../../localStorage/incomingMessageHistory';
import readUrl from '../../localStorage/readUrl';
import readBody from '../../localStorage/readBody';
import incomingMessagesEffect from './incomingMessagesEffect';
import outgoingMessagesEffect from './outgoingMessagesEffect';

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
  const [body, setBody] = useState(readBody());
  const [selectedTab, setSelectedTab] = useState(0);
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [outgoingMessages, setOutgoingMessages] = useState([]);

  useEffect(() => {
    incomingMessagesEffect(setIncomingMessages);
    outgoingMessagesEffect(setOutgoingMessages);
  }, []);

  function changeBody(newBody) {
    backupBody(newBody);
    setBody(newBody);
  }
  function changeUrl(newUrl) {
    backupUrl(newUrl);
    setUrl(newUrl);
  }

  function post(bodiesToPost = [body], skipState) {
    const newOutgoingMessages = outgoingMessages.concat(
      bodiesToPost.map(bodyToPost => ({ url, body: bodyToPost, timestamp: Date.now() }))
    );
    backupOutgoingMessageHistory(newOutgoingMessages);
    if (!skipState && bodiesToPost.length === 1) {
      setBody({
        ...bodiesToPost[0],
        id: Date.now()
      });
    }
    setOutgoingMessages(newOutgoingMessages);
    return Promise.all(bodiesToPost.map(bodyToPost => publishToServer(url, bodyToPost)));
  }

  function handleDeleteHistory() {
    const backupFunctions = [
      backupOutgoingMessageHistory,
      backupIncomingMessageHistory,
    ];
    const setState = [
      setOutgoingMessages,
      setIncomingMessages,
    ];

    backupFunctions[selectedTab]([]);
    setState[selectedTab]([]);
  }

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container spacing={16} className={classes.grid}>
        <Grid item xs={12}>
          <TargetUrlCard post={post} value={url} onChange={changeUrl} />
        </Grid>
        <Grid item xs={6}>
          <BodyFormCard value={body} onChange={changeBody} />
        </Grid>
        <Grid item xs={6}>
          <BodyDataPreview value={body} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PostSim);
