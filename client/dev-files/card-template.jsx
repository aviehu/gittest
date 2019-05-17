<Channel channel="camera1">
  {({data, actions}) => (
    <Card>
      <CardContent>
        <Label variant="h5" component="h2" gutterBottom>
          <Led value={data.active} />
          &nbsp;&nbsp;Camera 1
        </Label>
        <Label color="textSecondary">{`Resolution: ${data.resolution || 'Unknown'}`}</Label>
        <Label color="textSecondary">{`FPS: ${data.fps ? (data.fps + 'fps') : 'Unknown' }`}</Label>
      </CardContent>
      <CardActions>
        <Button size="small" disabled={actions.length === 0}>{actions[0] === 'off' ? 'Turn Off' : 'Turn On'}</Button>
      </CardActions>
    </Card>
  )}
</Channel>