const _cache = {};

export function addToCache(key, data) {
  _cache[key] = data;
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
