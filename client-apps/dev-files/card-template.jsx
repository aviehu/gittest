<Card>
  <CardContent>
    <Label variant="h5" component="h2" gutterBottom>
      <Led channel="camera1" channelProp="active" />
      &nbsp;&nbsp;Camera 1
    </Label>
    <Label color="textSecondary" channel="camera1" render={({data}) => `Resolution: ${data.resolution || 'Unknown'}`} />
    <Label color="textSecondary" channel="camera1" render={({data}) => `FPS: ${data.fps ? (data.fps + 'fps') : 'Unknown' }`} />
  </CardContent>
  <CardActions>
    <Button size="small" channel="camera1" render={({actions}) => actions[0] === 'off' ? 'Turn Off' : 'Turn On'}>Turn On</Button>
  </CardActions>
</Card>