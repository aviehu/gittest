import { ipcRenderer } from 'electron';

export default function getNewIncomingMessages(callback) {
  setInterval(() => {
    const newMessages = ipcRenderer.sendSync('getNewMessages');
    if (newMessages.length === 0) {
      return;
    }
    callback(newMessages);
  }, 500);
}
