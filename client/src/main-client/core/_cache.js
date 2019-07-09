import castArray from 'lodash/castArray';

const _cache = {};

export function addToCache(key, payload) {
  if (payload.accumulate && hasInCache(key)) {
    _cache[key] = { ...payload, data: castArray(_cache[key].data).concat(castArray(payload.data)) };
    return;
  }
  _cache[key] = payload;
}

export function deleteFromCache(key) {
  delete _cache[key];
}

export function getFromCache(key) {
  return _cache[key];
}

export function hasInCache(key) {
  return _cache[key] != null;
}
