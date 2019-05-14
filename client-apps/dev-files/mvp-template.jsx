<div style={{textAlign: "left", flexGrow: 1}}>
  <AppBar position="static" style={{
    backgroundImage: "url(/hp_menu_bg.jpg)",
    backgroundSize: "cover",
    backgroundPostion: "center"
  }}>
    <Toolbar>
      <img
        // className={classes.icon}
        style={{ marginLeft: -12, marginRight: 20 }}
        src="/2880px-LiveU_logo.svg.png"
        alt="live u logo"
        height="40px"
      />
      <Label variant="h6" style={{flexGrow: 1, color: "#ededee"}}>
        Pub Ui
      </Label>
      <div style={{flexGrow: 1}} />
      <Button style={{color: "#ededee"}}>Logout</Button>
    </Toolbar>
  </AppBar>
  <div
    // className={classes.content}
    style={{margin: 12}}
  >
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
    <Feed channel="logs" reverseFeed="true"/>
  </div>
</div>