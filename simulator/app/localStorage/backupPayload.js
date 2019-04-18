export default function backupPayload(payload) {
  return localStorage.setItem('payload', JSON.stringify(payload));
}
