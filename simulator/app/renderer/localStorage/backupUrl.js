export default function backupUrl(url) {
  return localStorage.setItem('url', url);
}
