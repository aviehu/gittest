export default function readPayload() {
  return localStorage.getItem('url') || '/publish';
}
