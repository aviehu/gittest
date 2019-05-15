<Channel channel={`cameras`} value={[]}>
  {({value, actions}) => (
    <Grid
      container
      direction="row"
      spacing={40}
      style={{ padding: 15, margin: 'auto', width: '100%' }}
    >
      {value.map(({ active, name, fps, resolution, error } = {}) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent style={{ flex: 1 }}>
              <Grid
                container
                direction="row"
                spacing={16}
              >
                <Grid item>
                  <Led value={active} />
                </Grid>
                <Grid item>
                  <Label variant="h5" gutterBottom>{name}</Label>
                </Grid>
              </Grid>
              <Label color="textSecondary" value={`Resolution: ${resolution} pixels`} prefix="" />
              <Label color="textSecondary" value={`FPS: ${fps} Hz`} />
              {fps ? <LinearGauge value={fps} min={0} max={100} /> : null}
              <Label color="textSecondary" color={'secondary'} value={error} />
            </CardContent>
            <CardActions>
              <Button size="small" value={active ? 'turn off' : 'turn on'} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    )}
</Channel>

