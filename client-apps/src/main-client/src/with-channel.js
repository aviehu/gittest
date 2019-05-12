import React from 'react';

import useChannel from './hooks/use-channel';

export default function WithChannel(WrappedComponent, defaultDomEvent) {
  return function WithChannelComponent(props) {
    const { actions, sendAction, ...channelProps } = useChannel(props);

    const componentProps = {
      ...channelProps,
      [defaultDomEvent]: () => sendAction(actions[0])
    };

    return <WrappedComponent {...componentProps} />;
  };
}
