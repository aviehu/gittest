import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import _ from 'lodash/fp';
import uuidv1 from 'uuid/v1';
import { LoremIpsum } from 'lorem-ipsum';
import Button from '../src/main-client/components/button';
import Label from '../src/main-client/components/label';
import Led from '../src/main-client/components/led';
import LinearGauge from '../src/main-client/components/linear-gauge';
import Feed from '../src/main-client/components/feed';
import { WebSocket, Server } from 'mock-socket';

window.WebSocket = WebSocket;

const defaultChannelData = {
  data: { text: 'hello world', ledColor: false },
  actions: ['punchIt'],
  url: 'http://localhost:8080'
};

const mockServer = new Server('ws://localhost:9001');
mockServer.on('connection', socket => {
  socket.on('message', data => {
    const message = JSON.parse(data);
    socket.send(JSON.stringify({ id: uuidv1(), reqId: message.id, type: 'ack' }))
  });
});

storiesOf('Button', module)
  .add('with text', () => <Button channel="testChannel">Hello Button</Button>)
  .add('with emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('with message data', () => (
    <Button
      channel="testChannel"
      initialChannelMessage={defaultChannelData}
      render={({ data }) => `Not ${data.text}`}
    />
  ))
  .add('with message data and channelProp', () => (
    <Button channel="testChannel" channelProp="text" initialChannelMessage={defaultChannelData} />
  ));

storiesOf('Label', module)
  .add('with text', () => <Label channel="testChannel">Hello Button</Label>)
  .add('with emoji', () => (
    <Label channel="ch">
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Label>
  ))
  .add('with message data', () => (
    <Label channel="testChannel" initialChannelMessage={defaultChannelData} render={({ data }) => data.text} />
  ))
  .add('with message data as title', () => (
    <Label
      channel="testChannel"
      variant="h5"
      component="h2"
      gutterBottom
      initialChannelMessage={defaultChannelData}
      render={({ data }) => data.text}
    />
  ))
  .add('with message data as secondary', () => <Label color="textSecondary">Nothing at all</Label>);

storiesOf('Led', module)
  .add('with hard coded value', () => <Led color="primary" />)
  // .add('with alternate colors & hard coded value', () => (
  //   <Led
  //     colorOptions={{ colorPrimary: { backgroundColor: '#FFC0CB' }, colorSecondary: { backgroundColor: '#244336' } }}
  //     color="primary"
  //   />
  // ))
  .add('with property picking the color', () => (
    <Led
      // colorOptions={{ colorPrimary: { backgroundColor: '#FFC0CB' }, colorSecondary: { backgroundColor: '#244336' } }}
      channel="testChannel"
      initialChannelMessage={defaultChannelData}
      channelProp="ledColor"
    />
  ))
  .add('with condition picking the color', () => (
    <Led
      // colorOptions={{ colorPrimary: { backgroundColor: '#FFC0CB' }, colorSecondary: { backgroundColor: '#244336' } }}
      channel="testChannel"
      initialChannelMessage={defaultChannelData}
      condition={({ data }) => data.text === 'hello world'}
    />
  ));

storiesOf('Card', module).add('example', () => (
  <Card>
    <CardContent>
      <Label variant="h5" component="h2" gutterBottom>
        <Led value="secondary" />
        &nbsp;&nbsp;Camera 1
      </Label>
      <Label color="textSecondary">Resolution: 1024 x 768</Label>
      <Label color="textSecondary">FPS: 30fps</Label>
    </CardContent>
    <CardActions>
      <Button size="small" disabled="false">
        Turn On
      </Button>
    </CardActions>
  </Card>
));

storiesOf('LinearGauge', module)
  .add('with hard coded value', () => <LinearGauge max={40} min={20} value={25} />)
  .add('secondary color', () => <LinearGauge color="secondary" max={40} min={20} value={25} />);

const classifications = ['debug', 'info', 'warn', 'error'];
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});
storiesOf('Feed', module)
  .add('using data', () => {
    const data = _.map(i => ({
      timestamp: new Date().toISOString(),
      level: classifications[i % 4],
      message: lorem.generateSentences(1)
    }))(_.range(50, 0));

    return <Feed channel="fake" initialChannelMessage={{ data }} />;
  }).add('using data & title', () => {
  const data = _.map(i => ({
    timestamp: new Date().toISOString(),
    level: classifications[i % 4],
    message: lorem.generateSentences(1)
  }))(_.range(50, 0));

  return <Feed channel="fake" initialChannelMessage={{ data }} title="Logs"/>;
});;
