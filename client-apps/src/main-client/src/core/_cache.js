import isArray from 'lodash/isArray';

const _cache = {};

export function addToCache(key, payload) {
  if (payload.accumulate && hasInCache(key) && isArray(_cache[key].data)) {
    _cache[key] = { ...payload, data: _cache[key].data.concat(payload.data) };
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
