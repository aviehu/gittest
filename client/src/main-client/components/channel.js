import useChannel from '../hooks/use-channel';

export default function Channel(props) {
  const { children } = props;
  const payload = useChannel(props);
  return children(payload);
}
