import { ipcRenderer } from 'electron';
import isEmpty from 'lodash/isEmpty';

export default function getNewIncomingMessages(callback) {
  setInterval(() => {
    const newMessages = ipcRenderer.sendSync('getNewMessages');
    if (isEmpty(newMessages)) {
      return;
    }
    callback(newMessages);
  }, 500);
}
