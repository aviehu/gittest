import getNewIncomingMessages from '../../api/getNewIncomingMessages';
import { backupIncomingMessageHistory, readIncomingMessageHistory } from '../../localStorage/incomingMessageHistory';

const MAX_ARRAY_SIZE = 15;
export default function incomingMessagesEffect(setMessages) {
  let allMessages = readIncomingMessageHistory();
  setMessages(allMessages);
  function formatNewMessage(newMessage) {
    return {
      timestamp: Date.now(),
      id: Date.now(),
      ...newMessage
    };
  }

  return getNewIncomingMessages(newMessages => {
    allMessages = allMessages.concat(newMessages.map(formatNewMessage));
    if (allMessages.length > MAX_ARRAY_SIZE) {
      allMessages = allMessages.splice(0, 1);
    }
    backupIncomingMessageHistory(allMessages);
    setMessages(allMessages);
  });
}
