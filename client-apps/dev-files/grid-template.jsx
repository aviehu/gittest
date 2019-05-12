<div style={{padding: "16px"}}>
  <Label variant="h4" gutterBottom>
    Cameras
  </Label>
  <Grid
    container
    spacing={16}
    justify="flex-start"
    direction="row"
    alignItems="center"
  >
    {
      [1,2,3,4].map((i) => (
        <Grid item xl={2} lg={3} md={3} xs={12} key={i}>
          <Channel channel={`camera${i}`}>
            {({data, actions}) => (
              <Card>
                <CardContent>
                  <Label variant="h5" component="h2" gutterBottom>
                    <Led value={data.active} />
                    &nbsp;&nbsp;{`Camera ${i}`}
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
        </Grid>
      ))
    }
  </Grid>
  <Label variant="h4" gutterBottom>
    Vehicle Info
  </Label>
  <Grid
    container
    spacing={16}
    justify="flex-start"
    direction="row"
    alignItems="center"
  >
    <Grid item md={3} xs={12}>
      <Channel channel="OBD">
        {({data}) => (
          <Card>
            <CardContent>
              <Label variant="h5" component="h2" gutterBottom>
                OBD
              </Label>
              <Label color="textSecondary">
                <span>Speed (kph):</span>&nbsp;{data.speed}
              </Label>
              <Label color="textSecondary">
                <span>RPM:</span>&nbsp;{data.rpm}
              </Label>
              <Label color="textSecondary">
                <span>Fuel:</span>&nbsp;{data.fuel}
              </Label>
            </CardContent>
          </Card>
        )}
      </Channel>
    </Grid>
    <Grid item md={3} xs={12}>
      <Channel channel="GPS">
        {({data}) => (
          <Card>
            <CardContent>
              <Label variant="h5" component="h2" gutterBottom>
                GPS
              </Label>
              <Label color="textSecondary">
                <span>X:</span>&nbsp;{data.x}
              </Label>
              <Label color="textSecondary">
                <span>Y:</span>&nbsp;{data.y}
              </Label>
              <Label color="textSecondary">
                <span>Z:</span>&nbsp;{data.z}
              </Label>
            </CardContent>
          </Card>
        )}
      </Channel>
    </Grid>
  </Grid>
</div>