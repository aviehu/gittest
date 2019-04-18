export default function readPayload() {
  const payloadBackup = localStorage.getItem('payload');
  if (!payloadBackup) {
    return {
      channel: 'channel',
      url: 'http://localhost:8001/callback',
      event: 'change',
      data: { value: 100 },
      actions: ['change']
    };
  }
  return JSON.parse(payloadBackup);
}
