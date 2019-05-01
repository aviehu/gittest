const itemKey = 'IncomingMessageHistory';
export function backupIncomingMessageHistory(item) {
  return localStorage.setItem(itemKey, JSON.stringify(item));
}

export function readIncomingMessageHistory() {
  const item = localStorage.getItem(itemKey);
  if (!item) {
    return [];
  }
  return JSON.parse(item);
}
