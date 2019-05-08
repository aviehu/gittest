import React from 'react';

import useBoundChannel from './hooks/use-channel';

export default function(WrappedComponent, defaultDomEvent) {
  return function WithChannel(props) {
    const { actions, sendAction, ...channelProps } = useBoundChannel(props);

    const componentProps = {
      ...channelProps,
      [defaultDomEvent]: () => sendAction(actions[0])
    };

    return <WrappedComponent {...componentProps} />;
  };
}
