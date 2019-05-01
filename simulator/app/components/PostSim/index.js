import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TargetUrlCard from '../TargetUrlCard';
import BodyDataPreview from '../BodyDataPreview';
import { backupOutgoingMessageHistory } from '../../localStorage/outgoingMessageHistory';

import BodyFormCard from '../BodyFormCard';
import IncomingMessagesPreviewCard from '../IncomingMessagesPreviewCard';
import OutgoingMessagesPreviewCard from '../OutgoingMessagesPreviewCard';
import publishToServer from '../../api/publish';
import AppBar from '../AppBar';
import backupUrl from '../../localStorage/backupUrl';
import backupBody from '../../localStorage/backupBody';
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

  function post() {
    const newOutgoingMessages = outgoingMessages.concat({ url, body, timestamp: Date.now() });
    backupOutgoingMessageHistory(newOutgoingMessages);
    setOutgoingMessages(newOutgoingMessages);
    setBody({
      ...body,
      id: Date.now()
    });
    return publishToServer(body);
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
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Tabs value={selectedTab} onChange={(event, value) => setSelectedTab(value)}>
                <Tab label="Incoming Messages" />
                <Tab label="Outgoing Messages" />
              </Tabs>
              {selectedTab === 0 && <IncomingMessagesPreviewCard messages={incomingMessages} />}
              {selectedTab === 1 && <OutgoingMessagesPreviewCard messages={outgoingMessages} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PostSim);
