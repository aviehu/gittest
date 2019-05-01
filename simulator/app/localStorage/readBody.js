export default function readBody() {
  const payloadBackup = localStorage.getItem('body');
  if (!payloadBackup) {
    return {
      id: Date.now(),
      channel: 'channel',
      url: 'http://localhost:8001/callback',
      event: 'change',
      data: { value: 100 },
      actions: ['change']
    };
  }
  return JSON.parse({
    ...payloadBackup,
    id: Date.now()
  });
}
