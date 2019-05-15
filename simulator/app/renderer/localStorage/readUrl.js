export default function readPayload() {
  return localStorage.getItem('url') || 'http://localhost:9002/publish';
}
