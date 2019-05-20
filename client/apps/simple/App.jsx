<Grid
  container
  direction="row"
  spacing={32}
  style={{ padding: 15 }}
>
  <Grid item>
    <Card style={{ width: 200 }}>
      <CardContent>
        <Grid
          container
          direction="row"
          spacing={16}
        >
          <Grid item>
            <Led channel="camera-a-active" />
          </Grid>
          <Grid item>
            <Label variant="h5" gutterBottom>Camera A</Label>
          </Grid>
        </Grid>
        <Label color="textSecondary" channel="camera-a-resolution" prefix="Resolution: " />
        <Label color="textSecondary" channel="camera-a-fps" prefix="FPS: " />
      </CardContent>
      <CardActions>
        <Button size="small" value="Offline" channel="camera-a-button" />
      </CardActions>
    </Card>
  </Grid>
  <Grid item>
    <Card style={{ width: 200 }}>
      <CardContent>
        <Grid
          container
          direction="row"
          spacing={16}
        >
          <Grid item>
            <Led channel="camera-b-active" />
          </Grid>
          <Grid item>
            <Label variant="h5" gutterBottom>Camera B</Label>
          </Grid>
        </Grid>
        <Label color="textSecondary" channel="camera-b-resolution" prefix="Resolution: " />
        <Label color="textSecondary" channel="camera-b-fps" prefix="FPS: " />
      </CardContent>
      <CardActions>
        <Button size="small" value="Offline" channel="camera-b-button" />
      </CardActions>
    </Card>
  </Grid>
</Grid>
