export default function backupBody(body) {
  return localStorage.setItem('body', JSON.stringify(body));
}
