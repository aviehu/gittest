const _ = require('lodash/fp');
const uuidv1 = require('uuid').v1;
const sleep = require('await-sleep');
const buildIngestServer = require('../src/ingestServer');
const cache = require('../src/cache');
const { addSubscriber, clearAllSubscribers } = require('../src/subscribers');

describe('ingest server', () => {
  let app;

  beforeAll(async () => {
    app = buildIngestServer();
  });

  beforeEach(() => {
    cache.clear();
    clearAllSubscribers();
  });

  it('should return 422 if invalid', async () => {
    const invalidPayload = { id: uuidv1(), source: 'jest', channel: 'video', event: 'something-happened', data: [] };
    const response = await app.inject({
      method: 'POST',
      url: `/publish`,
      payload: invalidPayload,
      headers: { Accept: 'application/json' }
    });
    expect(response.statusCode).toEqual(422);
  });
  it('should save valid data into a cache on one channel', async () => {
    const data = { fps: '30', resolution: '1200x800', c: 'd' };
    const payload = { id: uuidv1(), source: 'jest', channel: 'video', event: 'something-happened', data };
    const response = await app.inject({
      method: 'POST',
      url: `/publish`,
      payload,
      headers: { Accept: 'application/json' }
    });
    expect(response.statusCode).toEqual(200);
    expect(cache.get('video')).toEqual({ ...payload, type: 'forward' });
  });
  it('should save valid data into a cache on one channel and forward onto any subscribers', async () => {
    const sockets = _.map(() => ({ id: uuidv1(), sendJson: jest.fn() }))(_.range(0, 3));
    addSubscriber(sockets[0], 'video');
    addSubscriber(sockets[1], 'not-video');
    addSubscriber(sockets[2], 'video');

    const data = { fps: '30', resolution: '1200x800', c: 'd' };
    const payload = { id: uuidv1(), source: 'jest', channel: 'video', event: 'something-happened', data };
    const response = await app.inject({
      method: 'POST',
      url: `/publish`,
      payload,
      headers: { Accept: 'application/json' }
    });
    expect(response.statusCode).toEqual(200);
    expect(cache.get('video')).toEqual({ ...payload, type: 'forward' });
    await sleep(200);
    expect(sockets[0].sendJson).toHaveBeenCalledTimes(1);
    expect(sockets[0].sendJson).toHaveBeenCalledWith({ ...payload, type: 'forward' });
    expect(sockets[1].sendJson).toHaveBeenCalledTimes(0);
    expect(sockets[2].sendJson).toHaveBeenCalledTimes(1);
    expect(sockets[2].sendJson).toHaveBeenCalledWith({ ...payload, type: 'forward' });
  });
  it('should override the cache if a new message is sent on a channel & channel data should be separated in the cache', async () => {
    const videoDatas = [{ fps: '30', resolution: '1200x800', c: 'd' }, { fps: '25', resolution: '1200x800', c: 'e' }];
    const carDatas = [
      { velocity: '30', 'gps-x': '12', 'gps-y': '60', 'gps-z': '-10' },
      { velocity: '30', 'gps-x': '11.1', 'gps-y': '58', 'gps-z': '-10.05' },
      { velocity: '0', 'gps-x': '11.1', 'gps-y': '58', 'gps-z': '-10.05' }
    ];

    const videoPayload = { source: 'jest', channel: 'video', event: 'something-happened1' };
    const carPayload = { source: 'jest', channel: 'car', event: 'something-happened2' };

    const payloads = [
      Object.assign({}, videoPayload, { id: uuidv1(), data: videoDatas[0] }),
      Object.assign({}, carPayload, { id: uuidv1(), data: carDatas[0] }),
      Object.assign({}, videoPayload, { id: uuidv1(), data: videoDatas[1] }),
      Object.assign({}, carPayload, { id: uuidv1(), data: carDatas[1] }),
      Object.assign({}, carPayload, { id: uuidv1(), data: carDatas[2] })
    ];

    const responses = await Promise.all(
      _.map(
        payload =>
          app.inject({
            method: 'POST',
            url: `/publish`,
            payload,
            headers: { Accept: 'application/json' }
          }),
        payloads
      )
    );

    _.forEach(r => expect(r.statusCode).toEqual(200), responses);

    expect(cache.get('video')).toEqual({ ...payloads[2], type: 'forward' });
    expect(cache.get('car')).toEqual({ ...payloads[4], type: 'forward' });
  });
});
