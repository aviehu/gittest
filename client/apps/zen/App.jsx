<Grid container direction="row" spacing={32} style={{ padding: 15, margin: 'auto', width: '100%' }}>
  <Channel channel="cameras" initialData={[]}>
    {({ data }) =>
      data.map(({ active, name, fps, resolution, error, id } = {}) => (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent style={{ flex: 1 }}>
              <Grid container direction="row" spacing={16}>
                <Grid item>
                  <Led value={active} />
                </Grid>
                <Grid item>
                  <Label variant="h5" gutterBottom>
                    {name}
                  </Label>
                </Grid>
              </Grid>
              <Label color="textSecondary">Resolution: {resolution} pixels</Label>
              <Label color="textSecondary">FPS: {fps} Hz</Label>
              {fps && <LinearGauge value={fps} min={0} max={100} />}
              <Label color="secondary">{error}</Label>
            </CardContent>
            <CardActions>
              <Button size="small">{active ? 'turn off' : 'turn on'}</Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    }
  </Channel>
</Grid>;
