export default function readPayload() {
  return localStorage.getItem('url') || 'http://127.0.0.1:9002/bulk';
}
