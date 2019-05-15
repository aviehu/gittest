<Grid
  container
  direction="row"
  spacing={32}
  style={{ padding: 15 }}
>
  {['a', 'b', 'c', 'd', 'e'].map(camera => (
    <Grid item>
      <Card style={{ width: 200 }}>
        <CardContent>
          <Grid
            container
            direction="row"
            spacing={16}
          >
            <Grid item>
              <Led channel={`camera-${camera}-active`} />
            </Grid>
            <Grid item>
              <Label variant="h5" gutterBottom>Camera 1</Label>
            </Grid>
          </Grid>
          <Label color="textSecondary" channel={`camera-${camera}-resolution`} prefix="Resolution: " />
          <Label color="textSecondary" channel={`camera-${camera}-fps`} prefix="FPS: " />
          <LinearGauge channel={`camera-${camera}-fps`} min={0} max={100} />
        </CardContent>
        <CardActions>
          <Button size="small" value="Offline" channel={`camera-${camera}-button`} />
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
