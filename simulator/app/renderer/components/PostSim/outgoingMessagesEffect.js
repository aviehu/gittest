import { readOutgoingMessageHistory } from '../../localStorage/outgoingMessageHistory';

export default function outgoingMessagesEffect(setMessages) {
  const outGoingMessages = readOutgoingMessageHistory();
  setMessages(outGoingMessages);
}
