const itemKey = 'OutgoingMessageHistory';
export function backupOutgoingMessageHistory(item) {
  return localStorage.setItem(itemKey, JSON.stringify(item));
}

export function readOutgoingMessageHistory() {
  const item = localStorage.getItem(itemKey);
  if (!item) {
    return [];
  }
  return JSON.parse(item);
}
